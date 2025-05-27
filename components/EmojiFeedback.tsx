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
    <div className="emoji-feedback-container flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-full">
      {/* 左侧：标签列表 */}
      <div
        className="
          tag-list
          flex-1
          flex flex-wrap gap-2
          bg-gray-50 border border-gray-300
          rounded-lg p-3 min-h-[40px]
          max-w-full
        "
      >
        {tags.map(t => {
          const liked = t.by.includes(userId);
          return (
            <span
              key={t.tag}
              className={`tag-item
                flex items-center justify-center cursor-pointer
                px-3 py-1
                rounded-full
                text-sm truncate
                select-none
                transition-colors duration-200
                ${
                  liked
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
                }`}
              onClick={() => likeTag(t.tag)}
              title={liked ? '你已点赞' : '点击点赞'}
              style={{ maxWidth: '160px' }}
            >
              {t.tag} <span className="ml-1 font-semibold">{t.by.length}</span>
            </span>
          );
        })}
        {tags.length === 0 && (
          <span className="text-gray-400 text-sm">暂无标签，快来添加吧～</span>
        )}
      </div>
  
      {/* 右侧：输入框 */}
      <div
        className="
          tag-input
          flex-1
          bg-white border border-gray-300
          rounded-lg p-3
          w-full
        "
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="回车或逗号添加"
          className="w-full text-sm outline-none bg-transparent"
          maxLength={20}
        />
      </div>
    </div>
  );
  
};

export default EmojiFeedback;
