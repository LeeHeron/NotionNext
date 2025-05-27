import React, {
  useState,
  useEffect,
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
  by: string[]; // 点赞用户ID列表
}

const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId }) => {
  const userId =
    typeof window !== 'undefined'
      ? localStorage.getItem('userId') || 'guest'
      : 'guest';

  const [tags, setTags] = useState<TagDto[]>([]);
  const [inputValue, setInputValue] = useState('');

  // 获取现有标签
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`/api/feedback?paragraphId=${paragraphId}`);
        const data = await res.json();
        setTags(data.tags || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTags();
  }, [paragraphId]);

  // 添加新标签
  const addTag = async (newTag: string) => {
    const trimmed = newTag.trim();
    if (!trimmed || tags.find(t => t.tag === trimmed) || tags.length >= 10) {
      setInputValue('');
      return;
    }
    const updated = [...tags, { tag: trimmed, by: [] }];
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
      console.error(e);
    }
  };

  // 点赞标签
  const likeTag = async (index: number) => {
    const tagItem = tags[index];
    if (tagItem.by.includes(userId)) return; // 已点赞则不重复

    const updatedTags = [...tags];
    updatedTags[index].by.push(userId);
    setTags(updatedTags);

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paragraphId,
          tag: tagItem.tag,
          action: 'like',
          userId
        })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  return (
    <div className="emoji-feedback-container flex items-start space-x-4">
      {/* 左侧：标签列表 */}
      <div className="tag-list flex-1 flex flex-wrap bg-gray-50 border border-gray-300 rounded-lg p-2 min-h-[40px]">
        {tags.map((t, i) => (
          <span
            key={t.tag}
            className="tag-item flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2 text-sm"
          >
            {t.tag}
            <button
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                likeTag(i);
              }}
              className={`ml-2 text-xs font-semibold ${
                t.by.includes(userId)
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-500 hover:text-blue-500'
              }`}
              title="点击赞同该标签"
            >
              {t.by.length}
            </button>
          </span>
        ))}

        {tags.length === 0 && (
          <span className="text-gray-400 text-sm">暂无标签，快来添加吧～</span>
        )}
      </div>

      {/* 右侧：输入框 */}
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