// pages/api/feedback.js
export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO  = process.env.GITHUB_REPO;      // e.g. "user/repo"
  const ISSUE_NUMBER = process.env.FEEDBACK_ISSUE_NUMBER;
  const API_URL      = `https://api.github.com/repos/${GITHUB_REPO}/issues/${ISSUE_NUMBER}`;

  if (!GITHUB_TOKEN || !GITHUB_REPO || !ISSUE_NUMBER) {
    return res
      .status(500)
      .json({ message: 'Missing GITHUB_TOKEN, GITHUB_REPO or FEEDBACK_ISSUE_NUMBER' });
  }

  // 1️⃣ 先读取 Issue Body，解析 JSON
  async function readData() {
    const r = await fetch(API_URL, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    if (!r.ok) throw new Error(`GitHub ${r.status}`);
    const issue = await r.json();
    return JSON.parse(issue.body || '{}');
  }

  // 2️⃣ 把新数据写回 Issue Body
  async function writeData(data) {
    const r = await fetch(API_URL, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: JSON.stringify(data) })
    });
    if (!r.ok) throw new Error(`GitHub PATCH ${r.status}`);
    return await r.json();
  }

  // GET ?paragraphId=para-0
  if (req.method === 'GET') {
    const { paragraphId } = req.query;
    try {
      const data = await readData();
      // 确保 data.pages 存在
      const pages = data.pages || {};
      const tags  = pages[paragraphId] || [];
      return res.status(200).json({ tags });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to read tags' });
    }
  }

  // POST { paragraphId, tag, action, userId }
  if (req.method === 'POST') {
    const { paragraphId, tag, action, userId } = req.body;
    if (!paragraphId || !tag || !action || !userId) {
      return res
        .status(400)
        .json({ message: 'Require paragraphId, tag, action, userId' });
    }

    try {
      const data  = await readData();
      const pages = data.pages || {};
      const list  = pages[paragraphId] || [];  // 当前段落的标签数组

      let updatedList;
      if (action === 'add') {
        // 新增标签
        if (!list.find(t => t.tag === tag) && list.length < 10) {
          updatedList = list.concat({ tag, by: [] });
        } else {
          updatedList = list;
        }
      } else {
        // 点赞 or 取消
        updatedList = list.map(t => {
          if (t.tag !== tag) return t;
          const has = t.by.includes(userId);
          return {
            tag: t.tag,
            by: has ? t.by.filter(u => u !== userId) : t.by.concat(userId)
          };
        });
      }

      // 把更新写回 data.pages[paragraphId]
      const newData = {
        ...data,
        pages: {
          ...pages,
          [paragraphId]: updatedList
        }
      };

      await writeData(newData);
      return res.status(200).json({ tags: updatedList });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update tags' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
