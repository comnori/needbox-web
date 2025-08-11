import React from 'react';
import { useClipboard } from '../lib/clipboard';

interface Props {
  description: string;
}

export const Preview: React.FC<Props> = ({ description }) => {
  const { copy, toast } = useClipboard();
  return (
    <div>
      <h2>미리보기</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{description}</pre>
      <button onClick={() => copy(description)}>복사(설명)</button>
      {toast && <div role="status">{toast}</div>}
    </div>
  );
};
