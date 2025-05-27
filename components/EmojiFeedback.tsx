// components/EmojiFeedback.tsx
import React, { useState, useEffect, KeyboardEvent, MouseEvent } from 'react';

interface TagDto {
  tag: string;
  by: string[];      // 点赞用户列表
}

interface EmojiFeedbackProps {
  paragraphId: string;
}

const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId }) => {
  const userId =
    typeof window !== 'undefined'
      ? localStorage.getItem('userId') || 'guest'
      : 'guest';

  const [tags, setTags] = useState<TagDto[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string>();

  // 1️⃣ 首次加载，拉取已有标签
  useEffect(() => {
    fetch(`/api/tags?paragraphId=${paragraphId}`)
      .then((r) => r.json())
      .then((data: { tags: TagDto[] }) => setTags(data.tags || []))
      .catch((e) => console.error(e));
  }, [paragraphId]);

  // 2️⃣ 添加新标签
  const addTag = async (newTag: string) => {
    if (!newTag.trim() || tags.find((t) => t.tag === newTag) || tags.length >= 10)
      return;
    try {
      await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paragraphId, tag: newTag, action: 'add', userId })
      });
      setTags([...tags, { tag: newTag, by: [] }]);
    } catch (err) {
      setError('提交失败');
    }
  };

  // 3️⃣ 点赞／取消点赞
  const toggleVote = async (tag: string) => {
    const t = tags.find((t) => t.tag === tag);
    if (!t) return;
    const has = t.by.includes(userId);
    try {
      await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphId,
          tag,
          action: 'vote',
          userId
        })
      });
      setTags(
        tags.map((t) =>
          t.tag === tag
            ? {
                tag,
                by: has ? t.by.filter((u) => u !== userId) : [...t.by, userId]
              }
            : t
        )
      );
    } catch {
      setError('操作失败');
    }
  };

  // 处理键盘：回车或逗号添加
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="emoji-feedback-bar flex flex-wrap rounded-lg border p-2">
      {tags.map((t) => (
        <button
          key={t.tag}
          className={`
            tag-item mr-2 mb-2 px-3 py-1 rounded-full
            flex items-center
            ${t.by.includes(userId) ? 'bg-blue-200' : 'bg-gray-200'}
          `}
          onClick={() => toggleVote(t.tag)}
        >
          <span className="mr-1">{t.tag}</span>
          <span className="text-xs text-gray-600">({t.by.length})</span>
        </button>
      ))}

      {tags.length < 10 && (
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="输入标签，回车或逗号添加"
          className="flex-1 min-w-[100px] px-2 py-1 text-sm outline-none bg-transparent"
        />
      )}

      {error && <div className="w-full text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default EmojiFeedback;
