// components/EmojiFeedback.tsx
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent
} from 'react';

interface EmojiFeedbackProps {
  paragraphId: string; // 当前段落 ID，可用于后端同步
}

const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  // 添加新标签（去重，至多 10 个）
  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (
      trimmed &&
      !tags.includes(trimmed) &&
      tags.length < 10
    ) {
      setTags([...tags, trimmed]);
      // TODO: 同步到后端：POST { paragraphId, tags: [...tags, trimmed] }
    }
  };

  // 删除指定索引的标签
  const removeTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx));
    // TODO: 同步到后端：POST { paragraphId, tags: tags.filter(...) }
  };

  // 监听键盘：回车或逗号触发添加
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === 'Enter' || e.key === ',') &&
      inputValue.trim()
    ) {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    }
  };

  // 监听输入框变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className="emoji-feedback-bar
                 flex flex-wrap items-center
                 rounded-lg border border-gray-300
                 p-2"
    >
      {tags.map((tag, i) => (
        <span
          key={i}
          className="tag-item
                     flex items-center
                     bg-gray-200 rounded-full
                     px-3 py-1
                     mr-2 mb-2
                     text-sm"
        >
          <span>{tag}</span>
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

      {/* 仅在标签数 < 10 时显示输入框 */}
      {tags.length < 10 && (
        <input
          type="text"
          className="flex-1 min-w-[100px]
                     outline-none
                     text-sm
                     px-1 py-1
                     bg-transparent"
          placeholder="输入标签，回车或逗号添加"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

export default EmojiFeedback;
