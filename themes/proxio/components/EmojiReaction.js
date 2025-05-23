import reactions from '@/data/emojis.json';
import { useState } from 'react';

export default function EmojiReaction({ contentId }) {
  const [reaction] = useState(reactions[contentId] || {});

  const EMOJIS = ['👍', '❤️', '😂'];

  return (
    <div className="flex gap-3 mt-2 text-xl">
      {EMOJIS.map((emoji) => (
        <span key={emoji}>
          {emoji} {reaction[emoji] || 0}
        </span>
      ))}
    </div>
  );
}
