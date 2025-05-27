// components/EmojiFeedback.tsx
import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
  ReactElement
} from 'react';

interface EmojiFeedbackProps {
  paragraphId: string;
}

interface TagDto {
  tag: string;
  by: string[];  // 点赞用户列表，可后续扩展
}

/**
 * 标签反馈组件：左侧显示标签，右侧输入添加
 */
const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId }) => {
  const userId =
    typeof window !== 'undefined'
      ? localStorage.getItem('userId') || 'guest'
      : 'guest';

  // 所有标签数据
  const [tags, setTags] = useState<TagDto[]>([]);
  // 输入框内容
  const [inputValue, setInputValue] = useState('');

  // 添加标签
  const addTag = async (newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || tags.find(t => t.tag === trimmed) || tags.length >= 10) {
      setInputValue('');
      return;
    }
    // 更新本地
    const updated = tags.concat({ tag: trimmed, by: [] });
    setTags(updated);
    setInputValue('');
    // TODO: POST 同步到后端：{ paragraphId, tag: trimmed, action: 'add', userId }
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
      console.error(e);
    }
  };

  // 删除标签
  const removeTag = async (idx: number) => {
    const updated = tags.filter((_, i) => i !== idx);
    setTags(updated);
    // TODO: POST 同步到后端的删除逻辑（可选）
  };

  // 处理输入：回车或逗号添加
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="emoji-feedback-container flex items-start space-x-4">
      {/* 左侧：标签列表 */}
      <div
        className="tag-list
                   flex-1
                   flex flex-wrap
                   bg-gray-50 border border-gray-300
                   rounded-lg p-2 min-h-[40px]"
      >
        {tags.map((t, i) => (
          <span
            key={t.tag}
            className="tag-item
                       flex items-center
                       bg-gray-200 rounded-full
                       px-3 py-1 mr-2 mb-2
                       text-sm"
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

        {/* 如果没有标签可以显示占位 */}
        {tags.length === 0 && (
          <span className="text-gray-400 text-sm">
            暂无标签，快来添加吧～
          </span>
        )}
      </div>

      {/* 右侧：输入框 */}
      <div className="tag-input
                      w-40
                      bg-white border border-gray-300
                      rounded-lg p-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="回车或逗号添加"
          className="w-full
                     text-sm
                     outline-none
                     bg-transparent"
        />
      </div>
    </div>
  );
};

export default EmojiFeedback;
