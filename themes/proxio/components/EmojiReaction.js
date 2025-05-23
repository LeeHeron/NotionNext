import reactions from '@/data/emojis.json';
import { useState } from 'react';

export default function EmojiReaction({ contentId }) {
  const [reaction, setReaction] = useState(reactions[contentId] || {});
  const EMOJIS = ['👍', '❤️', '😂'];

  const handleClick = (emoji) => {
    // 本地记录点击行为
    const stored = JSON.parse(localStorage.getItem('pending-emojis') || '{}');

    if (!stored[contentId]) stored[contentId] = {};
    stored[contentId][emoji] = (stored[contentId][emoji] || 0) + 1;

    localStorage.setItem('pending-emojis', JSON.stringify(stored));

    // 前端展示更新
    setReaction({
      ...reaction,
      [emoji]: (reaction[emoji] || 0) + 1
    });
  };

  return (
    <div className="flex gap-3 mt-2 text-xl">
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleClick(emoji)}
          className="hover:scale-110 transition-transform"
        >
          {emoji} {reaction[emoji] || 0}
        </button>
      ))}
    </div>
  );
}
