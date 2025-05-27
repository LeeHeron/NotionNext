import { Octokit } from '@octokit/rest'

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const owner = LeeHeron
const repo = process.env.GITHUB_REPO;
const LABEL_PREFIX = '[emoji-feedback]' // 用于识别相关 issue

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const { paragraphId } = req.query
    if (!paragraphId) {
      return res.status(400).json({ error: 'Missing paragraphId' })
    }

    try {
      // 搜索 issue
      const { data: issues } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state: 'open',
        labels: `${LABEL_PREFIX}:${paragraphId}`
      })

      if (issues.length === 0) {
        return res.status(200).json({ tags: [] })
      }

      const body = issues[0].body
      const parsed = JSON.parse(body || '{}')
      return res.status(200).json({ tags: parsed.tags || [] })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Failed to fetch tags' })
    }
  }

  if (method === 'POST') {
    const { paragraphId, tag, action, userId } = req.body
    if (!paragraphId || !tag || !action || !userId) {
      return res.status(400).json({ error: 'Missing fields' })
    }

    const label = `${LABEL_PREFIX}:${paragraphId}`

    // 获取或创建对应段落的标签 issue
    let issue = null
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      labels: label
    })

    if (issues.length > 0) {
      issue = issues[0]
    } else {
      const newIssue = await octokit.rest.issues.create({
        owner,
        repo,
        title: `Tag feedback for paragraph ${paragraphId}`,
        body: JSON.stringify({ tags: [] }, null, 2),
        labels: [label]
      })
      issue = newIssue.data
    }

    // 更新标签列表
    let content = {}
    try {
      content = JSON.parse(issue.body || '{}')
    } catch {
      content = { tags: [] }
    }

    const tags = content.tags || []

    if (action === 'add') {
      if (!tags.find(t => t.tag === tag)) {
        tags.push({ tag, by: [] })
      }
    }

    // 可扩展更多 action，例如点赞、删除等

    // 更新 issue 内容
    await octokit.rest.issues.update({
      owner,
      repo,
      issue_number: issue.number,
      body: JSON.stringify({ tags }, null, 2)
    })

    return res.status(200).json({ ok: true, tags })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${method} Not Allowed`)
}
