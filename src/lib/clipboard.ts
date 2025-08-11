import { useState } from 'react';

export const useClipboard = () => {
  const [toast, setToast] = useState<string | null>(null);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast('복사되었습니다');
    } catch {
      setToast('복사에 실패했습니다');
    }
    setTimeout(() => setToast(null), 2000);
  };

  return { copy, toast };
};
