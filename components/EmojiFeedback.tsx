// components/EmojiFeedback.tsx
import React, {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
} from 'react';

interface EmojiFeedbackProps {
  paragraphId: string;
}

interface TagDto {
  tag: string;
  by: string[]; // 点赞用户ID列表
}

// 生成或获取唯一用户ID
function getUserId(): string {
  if (typeof window === 'undefined') return 'guest';
  let id = localStorage.getItem('userId');
  if (!id) {
    id = 'user_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('userId', id);
  }
  return id;
}

const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId }) => {
  const userId = getUserId();

  const [tags, setTags] = useState<TagDto[]>([]);
  const [inputValue, setInputValue] = useState('');

  // 从后端加载已有标签
  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(`/api/feedback?paragraphId=${encodeURIComponent(paragraphId)}`);
        if (!res.ok) throw new Error('Failed to load tags');
        const data = await res.json();
        if (data.tags && Array.isArray(data.tags)) {
          setTags(data.tags);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchTags();
  }, [paragraphId]);

  // 添加标签
  const addTag = async (newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || tags.find(t => t.tag === trimmed) || tags.length >= 10) {
      setInputValue('');
      return;
    }
    const updated = [...tags, { tag: trimmed, by: [] }];
    setTags(updated);
    setInputValue('');

    // 同步到后端
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphId,
          tag: trimmed,
          action: 'add',
          userId,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // 点赞标签
  const likeTag = async (tag: string) => {
    const target = tags.find(t => t.tag === tag);
    if (!target) return;
    if (target.by.includes(userId)) return;

    const updated = tags.map(t =>
      t.tag === tag ? { ...t, by: [...t.by, userId] } : t
    );
    setTags(updated);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphId,
          tag,
          action: 'like',
          userId,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // 输入回车或逗号添加标签
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="emoji-feedback-container w-full space-y-4 sm:space-y-0 sm:flex sm:space-x-6">
      {/* 标签列表 */}
      <div className="flex-1 bg-gray-50 border border-gray-300 rounded-lg p-2 min-h-[40px] flex flex-wrap gap-1">
        {tags.length === 0 && (
          <span className="text-gray-400 text-sm">无人锐评</span>
        )}
        {tags.map(t => {
          const liked = t.by.includes(userId);
          return (
            <span
              key={t.tag}
              className={`flex items-center cursor-pointer px-2 py-1 rounded-full text-sm truncate transition-colors
                ${liked ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
              `}
              onClick={() => likeTag(t.tag)}
              title={liked ? '你已点赞' : '点击点赞'}
            >
              {t.tag}
              <span className="ml-1 font-semibold">{t.by.length}</span>
            </span>
          );
        })}
      </div>
  
      {/* 输入框 */}
      <div className="flex-1 bg-white border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="回车添加,逗号可能会有bug"
          className="w-full text-sm outline-none bg-transparent"
          maxLength={20}
        />
      </div>
    </div>
  );
  
  
};

export default EmojiFeedback;
