import React, { useState, useEffect } from 'react';

// 传入 props:
// id: 内容段唯一标识，比如 "para-1"
// emojisData: 来自服务器的 emoji 统计数据对象，例如 { "para-1": { "👍": 5 } }
// emojiList: 你想展示的 emoji 数组，例如 ["👍", "😂", "❤️"]
export default function EmojiReaction({ id, emojisData, emojiList }) {
  // 本地点击的“pending”数据
  const [pending, setPending] = useState({});

  // 加载 localStorage 中的 pending-emojis
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

  // 点击 emoji 处理函数
  function handleClick(emoji) {
    const updatedPending = { ...pending };

    if (!updatedPending[id]) updatedPending[id] = {};
    updatedPending[id][emoji] = (updatedPending[id][emoji] || 0) + 1;

    setPending(updatedPending);
    localStorage.setItem('pending-emojis', JSON.stringify(updatedPending));
  }

  // 获取显示的计数 = 服务器数据 + pending数据
  function getCount(emoji) {
    const serverCount = emojisData[id]?.[emoji] || 0;
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
        >
          {emoji} {getCount(emoji)}
        </button>
      ))}
    </div>
  );
}
