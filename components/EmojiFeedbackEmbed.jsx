import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import EmojiFeedback from './EmojiFeedback';

/**
 * EmojiFeedbackEmbed
 * 扫描所有带有 [emoji-feedback] 短代码的段落，并在对应位置动态挂载 EmojiFeedback 组件
 */
const EmojiFeedbackEmbed = () => {
  useEffect(() => {
    // 延迟执行，确保 NotionRenderer 渲染完成
    const timer = setTimeout(() => {
      const notionTextEls = document.querySelectorAll(
        '#article-wrapper #notion-article div.notion-text'
      );

      notionTextEls.forEach((el, idx) => {
        if (el.textContent.trim() === '[emoji-feedback]') {
          const paragraphId = `para-${idx}`;
          const container = document.createElement('div');
          container.id = `emoji-feedback-${paragraphId}`;
          el.parentNode.replaceChild(container, el);

          ReactDOM.render(
            <EmojiFeedback paragraphId={paragraphId} />, 
            container
          );
        }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default EmojiFeedbackEmbed;
