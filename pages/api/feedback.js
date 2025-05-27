// pages/api/feedback.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST'])
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
    }
  
    const { paragraphId, emoji } = req.body
  
    if (!paragraphId || !emoji) {
      return res.status(400).json({ message: 'Missing paragraphId or emoji in request body' })
    }
  
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN
    const GITHUB_REPO = process.env.GITHUB_REPO      // e.g. "username/repo"
    const GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com'
  
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      console.error('Missing GITHUB_TOKEN or GITHUB_REPO env variable')
      return res.status(500).json({ message: 'Server misconfiguration' })
    }
  
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/repos/${GITHUB_REPO}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: `Emoji Feedback: ${emoji}`,
            body: `User reacted with **${emoji}** on paragraph \`${paragraphId}\`.`,
            labels: ['emoji-feedback']      // 可选：给这些 Issue 打上标签
          })
        }
      )
  
      if (!response.ok) {
        const text = await response.text()
        console.error('GitHub API error:', response.status, text)
        return res.status(response.status).json({ message: 'Failed to create GitHub issue', detail: text })
      }
  
      const issue = await response.json()
      return res.status(200).json({ message: 'Feedback submitted', issueUrl: issue.html_url })
    } catch (err) {
      console.error('Unexpected error:', err)
      return res.status(500).json({ message: 'Unexpected server error' })
    }
  }
  