export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { emoji, paragraphId } = req.body;
  
      const response = await fetch(`${process.env.GITHUB_API_URL}/repos/${process.env.GITHUB_REPO}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Emoji Feedback: ${emoji}`,
          body: `User reacted with ${emoji} to paragraph ID: ${paragraphId}`,
        }),
      });
  
      if (response.ok) {
        res.status(200).json({ message: 'Feedback submitted successfully.' });
      } else {
        res.status(response.status).json({ message: 'Failed to submit feedback.' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed.' });
    }
  }
  