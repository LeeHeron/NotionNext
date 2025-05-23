import React, { useState, useEffect } from 'react';
// 这里使用静态导入json，如果是next.js可以用import
import emojis from '@/data/emojis.json'; // 修改为你项目对应路径

export default function EmojiReaction({ id, emojisData }) {
  // pending数据
  const [pending, setPending] = useState({});

  // emoji列表，从json中提取 symbol 字段
  const [emojiList, setEmojiList] = useState([]);

  useEffect(() => {
    setEmojiList(emojis.map(e => e.symbol));
  }, []);

  // 加载 localStorage pending
  useEffect(() => {
    const stored = localStorage.getItem('pending-emojis');
    if (stored) {
      try {
        setPending(JSON.parse(stored));
      } catch {
        setPending({});
      }
    }
  }, []);

  function handleClick(emoji) {
    const updatedPending = { ...pending };
    if (!updatedPending[id]) updatedPending[id] = {};
    updatedPending[id][emoji] = (updatedPending[id][emoji] || 0) + 1;

    setPending(updatedPending);
    localStorage.setItem('pending-emojis', JSON.stringify(updatedPending));
  }

  function getCount(emoji) {
    const serverCount = emojisData?.[id]?.[emoji] || 0;
    const pendingCount = pending[id]?.[emoji] || 0;
    return serverCount + pendingCount;
  }

  return (
    <div className="emoji-reaction">
      {emojiList.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleClick(emoji)}
          style={{ marginRight: 8, cursor: 'pointer' }}
          aria-label={`React with ${emoji}`}
          type="button"
        >
          {emoji} {getCount(emoji)}
        </button>
      ))}
    </div>
  );
}
