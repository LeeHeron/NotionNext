import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [pendingData, setPendingData] = useState(null);

  // 加载 localStorage 里的 pending-emojis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('pending-emojis');
      if (data) setPendingData(JSON.parse(data));
      else setPendingData({});
    }
  }, []);

  // 导出 JSON 文件
  function exportJSON() {
    if (!pendingData) return;
    const blob = new Blob([JSON.stringify(pendingData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pending-emojis.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  // 清空 localStorage 里的 pending-emojis
  function clearPending() {
    localStorage.removeItem('pending-emojis');
    setPendingData({});
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>数据管理页面</h1>

      <h2>当前本地待上传数据（pending-emojis）</h2>
      <pre style={{ backgroundColor: '#f0f0f0', padding: 10, maxHeight: 300, overflowY: 'auto' }}>
        {pendingData ? JSON.stringify(pendingData, null, 2) : '暂无数据'}
      </pre>

      <button onClick={exportJSON} style={{ marginRight: 10 }}>
        导出 JSON 文件
      </button>

      <button onClick={clearPending} style={{ backgroundColor: '#f44336', color: 'white' }}>
        清空本地缓存数据
      </button>
    </div>
  );
}
