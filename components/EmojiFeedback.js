// components/EmojiFeedback.jsx
const handleEmojiClick = async (emojiData) => {
    setShowPicker(false);
    if (onSelect) {
      onSelect(emojiData.emoji);
    }
  
    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emoji: emojiData.emoji,
        paragraphId: paragraphId, // 从 props 中获取的段落 ID
      }),
    });
  };
  