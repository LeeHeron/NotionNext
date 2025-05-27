import React, { useState } from 'react';

interface EmojiFeedbackProps {
  paragraphId: string;
  onFeedbackSent?: (emoji: string) => void;
}

// 动态导入 Picker 和 data，以支持 SSR 关闭
import dynamic from 'next/dynamic';
const Picker = dynamic(() => import('@emoji-mart/react'), { ssr: false });
import data from '@emoji-mart/data';

const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId, onFeedbackSent }) => {
  const [chosenEmoji, setChosenEmoji] = useState<string | null>(null);

  const handleSelect = async (emoji: any) => {
    const native = emoji.native;
    setChosenEmoji(native);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paragraphId, emoji: native })
      });

      if (res.ok) {
        onFeedbackSent?.(native);
      } else {
        console.error('Feedback submission failed', await res.text());
      }
    } catch (err) {
      console.error('Error submitting feedback', err);
    }
  };

  return (
    <div className="emoji-feedback-container">
      <button
        className="emoji-feedback-button"
        onClick={() => setChosenEmoji(chosenEmoji)}
      >
        {chosenEmoji || '😀'}
      </button>

      <div className="emoji-picker-wrapper">
        <Picker data={data} onEmojiSelect={handleSelect} />
      </div>
    </div>
  );
};

export default EmojiFeedback;
