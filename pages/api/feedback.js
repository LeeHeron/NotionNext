import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

const OWNER = 'LeeHeron';
const REPO = 'emoji-collection';
const ISSUE_NUMBER = 18;

export default async function handler(req, res) {
  const { paragraphId, tag, action, userId } = req.method === 'POST' ? req.body : req.query;

  if (!paragraphId) return res.status(400).json({ error: 'Missing paragraphId' });

  // 获取现有数据
  let issue;
  try {
    issue = await octokit.rest.issues.get({
      owner: OWNER,
      repo: REPO,
      issue_number: ISSUE_NUMBER
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch issue data' });
  }

  let json;
  try {
    json = JSON.parse(issue.data.body || '{"pages":{}}');
  } catch {
    json = { pages: {} };
  }

  if (!json.pages[paragraphId]) json.pages[paragraphId] = { tags: [] };
  const tags = json.pages[paragraphId].tags;

  if (req.method === 'GET') {
    return res.status(200).json({ tags });
  }

  if (req.method === 'POST') {
    if (!tag || !action || !userId)
      return res.status(400).json({ error: 'Missing tag/action/userId' });

    if (action === 'add') {
      if (!tags.find(t => t.tag === tag)) {
        tags.push({ tag, by: [] });
      }
    } else if (action === 'like') {
      const found = tags.find(t => t.tag === tag);
      if (found && !found.by.includes(userId)) {
        found.by.push(userId);
      }
    }

    try {
      await octokit.rest.issues.update({
        owner: OWNER,
        repo: REPO,
        issue_number: ISSUE_NUMBER,
        body: JSON.stringify(json, null, 2)
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update issue' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
