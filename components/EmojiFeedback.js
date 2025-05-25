import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiFeedback = ({ paragraphId }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (emojiData) => {
    setChosenEmoji(emojiData);
    setShowPicker(false);

    // TODO: 将反馈数据发送到 GitHub 仓库或其他后端服务
    // 例如，使用 fetch 或 axios 发送 POST 请求
  };

  return (
    <div className="emoji-feedback">
      <button onClick={() => setShowPicker(!showPicker)}>
        {chosenEmoji ? chosenEmoji.emoji : '😊'}
      </button>
      {showPicker && (
        <div className="emoji-picker">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default EmojiFeedback;
