// pages/api/feedback.js

export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO  = process.env.GITHUB_REPO;      // e.g. "username/repo"
  const ISSUE_NUMBER = process.env.FEEDBACK_ISSUE_NUMBER;
  const API_URL      = `https://api.github.com/repos/${GITHUB_REPO}/issues/${ISSUE_NUMBER}`;

  if (!GITHUB_TOKEN || !GITHUB_REPO || !ISSUE_NUMBER) {
    return res
      .status(500)
      .json({ message: 'Missing GITHUB_TOKEN, GITHUB_REPO or FEEDBACK_ISSUE_NUMBER' });
  }

  // 拉取标签
  if (req.method === 'GET') {
    try {
      const r = await fetch(API_URL, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` }
      });
      if (!r.ok) throw new Error(`GitHub ${r.status}`);
      const issue = await r.json();
      const data  = JSON.parse(issue.body || '{}');
      return res.status(200).json({ tags: data.tags || [] });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to read tags' });
    }
  }

  // 新增或投票
  if (req.method === 'POST') {
    const { paragraphId, tag, action, userId } = req.body;
    if (!paragraphId || !tag || !action || !userId) {
      return res
        .status(400)
        .json({ message: 'Request must include paragraphId, tag, action and userId' });
    }

    try {
      // 1) 读现有数据
      const r1 = await fetch(API_URL, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` }
      });
      if (!r1.ok) throw new Error(`GitHub ${r1.status}`);
      const issue = await r1.json();
      const data  = JSON.parse(issue.body || '{}');
      const tags  = data.tags || [];

      // 2) 更新数组
      let updated = tags;
      if (action === 'add') {
        if (!tags.find(t => t.tag === tag) && tags.length < 10) {
          updated = tags.concat({ tag, by: [] });
        }
      } else if (action === 'vote') {
        updated = tags.map(t => {
          if (t.tag === tag) {
            const has = t.by.includes(userId);
            return {
              tag: t.tag,
              by: has ? t.by.filter(u => u !== userId) : t.by.concat(userId)
            };
          }
          return t;
        });
      }

      // 3) 写回 Issue body
      const r2 = await fetch(API_URL, {
        method: 'PATCH',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: JSON.stringify({ tags: updated })
        })
      });
      if (!r2.ok) throw new Error(`GitHub PATCH ${r2.status}`);

      return res.status(200).json({ tags: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update tags' });
    }
  }

  // 其它方法
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
