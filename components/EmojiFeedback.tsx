// components/EmojiFeedback.tsx
import React, { useState, useEffect, ReactElement } from 'react'
import dynamic from 'next/dynamic'

// 动态导入，禁用 SSR
const ReactionBarSelector = dynamic(
  () =>
    import('@charkour/react-reactions').then(
      (mod) => mod.ReactionBarSelector
    ),
  { ssr: false }
)
const ReactionCounter = dynamic(
  () =>
    import('@charkour/react-reactions').then(
      (mod) => mod.ReactionCounter
    ),
  { ssr: false }
)

interface EmojiFeedbackProps {
  paragraphId: string
}

interface ReactionItem {
  key: string
  label: string
  count: number
  reacted: boolean
  node: ReactElement
  by: string[]      // 本地存储所有点过该反馈的用户 ID
}

const EmojiFeedback: React.FC<EmojiFeedbackProps> = ({ paragraphId }) => {
  // 本地模拟 userId，实际项目可替换为登录用户 ID
  const userId =
    typeof window !== 'undefined'
      ? localStorage.getItem('userId') || 'guest'
      : 'guest'

  // 初始几种反馈选项
  const [reactions, setReactions] = useState<ReactionItem[]>([
    {
      key: 'like',
      label: '👍',
      count: 0,
      reacted: false,
      node: <span>👍</span>,
      by: []
    },
    {
      key: 'love',
      label: '❤️',
      count: 0,
      reacted: false,
      node: <span>❤️</span>,
      by: []
    },
    {
      key: 'laugh',
      label: '😂',
      count: 0,
      reacted: false,
      node: <span>😂</span>,
      by: []
    }
  ])
  const [showSelector, setShowSelector] = useState(false)

  // 页面加载时，可选：从后端拉取历史反馈并初始化
  useEffect(() => {
    fetch(`/api/feedback?paragraphId=${paragraphId}`)
      .then((res) => res.json())
      .then((data: { reactions: ReactionItem[] }) => {
        if (data.reactions) setReactions(data.reactions)
      })
      .catch(() => {
        /* 忽略失败 */ 
      })
  }, [paragraphId])

  // 用户点击某个 reaction
  const handleSelect = async (key: string) => {
    setReactions((prev) =>
      prev.map((r) => {
        if (r.key === key) {
          const hasReacted = r.by.includes(userId)
          return {
            ...r,
            count: hasReacted ? r.count - 1 : r.count + 1,
            reacted: !hasReacted,
            by: hasReacted
              ? r.by.filter((id) => id !== userId)
              : [...r.by, userId]
          }
        }
        return r
      })
    )

    // 提交到后端
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paragraphId, reaction: key, userId })
    })
  }

  return (
    <div className="emoji-feedback-wrap">
      {/* 统计条：注意 by 要传一个字符串（当前用户 ID） */}
      <ReactionCounter
        reactions={reactions.map((r) => ({
          key: r.key,
          label: r.label,
          count: r.count,
          node: r.node,
          // by 字段里如果包含当前 userId，就会被高亮
          by: r.by.includes(userId) ? userId : ''
        }))}
      />

      {/* 切换按钮 */}
      <button
        className="reaction-toggle-btn"
        onClick={() => setShowSelector((v) => !v)}
      >
        {showSelector ? '关闭反馈' : '添加反馈'}
      </button>

      {/* 弹出选择器 */}
      {showSelector && (
        <ReactionBarSelector
          reactions={reactions.map((r) => ({
            key: r.key,
            label: r.label,
            node: r.node
          }))}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}

export default EmojiFeedback
