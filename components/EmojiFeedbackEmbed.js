import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import EmojiFeedback from './EmojiFeedback';

const EmojiFeedbackEmbed = () => {
  useEffect(() => {
    setTimeout(() => {
      const notionTextElements = document.querySelectorAll(
        '#article-wrapper #notion-article div.notion-text'
      );

      notionTextElements?.forEach((element, index) => {
        const text = element.textContent.trim();

        if (text === '[emoji-feedback]') {
          const container = document.createElement('div');
          const paragraphId = `para-${index}`;
          container.id = `emoji-feedback-${paragraphId}`;
          element?.parentNode?.replaceChild(container, element);

          ReactDOM.render(
            <EmojiFeedback paragraphId={paragraphId} />,
            container
          );
        }
      });
    }, 1000);
  }, []);

  return null;
};

export default EmojiFeedbackEmbed;
