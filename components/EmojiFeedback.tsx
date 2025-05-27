// components/EmojiFeedback.tsx
import React, {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent
} from 'react';

interface EmojiFeedbackProps {
  paragraphId: string;
}

interface TagDto {
  tag: string;
  by: string[]; // 点赞用户列表
}

const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId }) => {
  const userId =
    typeof window !== 'undefined'
      ? localStorage.getItem('userId') || 'guest'
      : 'guest';

  const [tags, setTags] = useState<TagDto[]>([]);
  const [inputValue, setInputValue] = useState('');

  // ✅ 从后端加载标签数据
  useEffect(() => {
    const loadTags = async () => {
      try {
        const res = await fetch(`/api/feedback?paragraphId=${paragraphId}`);
        const data = await res.json();
        if (data?.tags) {
          setTags(data.tags);
        }
      } catch (err) {
        console.error('加载标签失败:', err);
      }
    };
    loadTags();
  }, [paragraphId]);

  // 添加标签
  const addTag = async (newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || tags.find(t => t.tag === trimmed) || tags.length >= 10) {
      setInputValue('');
      return;
    }

    const updated = tags.concat({ tag: trimmed, by: [] });
    setTags(updated);
    setInputValue('');

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphId,
          tag: trimmed,
          action: 'add',
          userId
        })
      });
    } catch (e) {
      console.error('添加标签失败:', e);
    }
  };

  // 删除标签（可选）
  const removeTag = async (idx: number) => {
    const updated = tags.filter((_, i) => i !== idx);
    setTags(updated);
    // 你可以在这里添加删除到 GitHub 的逻辑
  };

  // 处理回车或逗号添加
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="emoji-feedback-container flex items-start space-x-4">
      {/* 标签列表 */}
      <div
        className="tag-list
                   flex-1 flex flex-wrap
                   bg-gray-50 border border-gray-300
                   rounded-lg p-2 min-h-[40px]"
      >
        {tags.map((t, i) => (
          <span
            key={t.tag}
            className="tag-item
                       flex items-center
                       bg-gray-200 rounded-full
                       px-3 py-1 mr-2 mb-2 text-sm"
          >
            {t.tag}
            <button
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                removeTag(i);
              }}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </span>
        ))}
        {tags.length === 0 && (
          <span className="text-gray-400 text-sm">暂无标签，快来添加吧～</span>
        )}
      </div>

      {/* 输入框 */}
      <div className="tag-input w-40 bg-white border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="回车或逗号添加"
          className="w-full text-sm outline-none bg-transparent"
        />
      </div>
    </div>
  );
};

export default EmojiFeedback;
