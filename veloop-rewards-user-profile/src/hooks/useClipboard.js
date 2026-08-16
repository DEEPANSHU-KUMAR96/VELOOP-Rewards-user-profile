import { useState, useCallback } from 'react';

export const useClipboard = (timeout = 2500) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      if (!text) return false;
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        console.error('Failed to copy: ', err);
        return false;
      }
    },
    [timeout]
  );

  return { copied, copy };
};
