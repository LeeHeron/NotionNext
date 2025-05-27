// pages/api/feedback.js
import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const OWNER = 'LeeHeron';
const REPO = 'emoji-collection';
const ISSUE_NUMBER = 18 // 你存储 feedback 的 Issue 编号

export default async function handler(req, res) {
  const { method, body, query } = req

  const paragraphId = body.paragraphId || query.paragraphId
  if (!paragraphId) {
    return res.status(400).json({ error: 'paragraphId is required' })
  }

  try {
    const { data: issue } = await octokit.rest.issues.get({
      owner: OWNER,
      repo: REPO,
      issue_number: ISSUE_NUMBER
    })

    let store = {}
    try {
      store = JSON.parse(issue.body || '{}')
    } catch {
      store = {}
    }

    if (method === 'GET') {
      const tags = store[paragraphId]?.tags || []
      return res.status(200).json({ tags })
    }

    if (method === 'POST') {
      const { tag, userId, action } = body
      if (!tag || !userId || !action) {
        return res.status(400).json({ error: 'tag, userId and action required' })
      }

      const tags = store[paragraphId]?.tags || []
      const existing = tags.find(t => t.tag === tag)

      if (action === 'add') {
        if (!existing) tags.push({ tag, by: [] })
      } else if (action === 'like') {
        if (existing && !existing.by.includes(userId)) {
          existing.by.push(userId)
        }
      } else if (action === 'unlike') {
        if (existing) {
          existing.by = existing.by.filter(u => u !== userId)
        }
      }

      store[paragraphId] = { tags }

      await octokit.rest.issues.update({
        owner: OWNER,
        repo: REPO,
        issue_number: ISSUE_NUMBER,
        body: JSON.stringify(store, null, 2)
      })

      return res.status(200).json({ ok: true, tags })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${method} Not Allowed`)
  } catch (err) {
    console.error('API Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
