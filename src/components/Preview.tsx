import React, { useEffect, useState } from 'react';
import { useClipboard } from '../lib/clipboard';

interface Props {
  description: string;
}

const CopyIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="toast-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const EmptyStateIcon = () => (
  <svg style={{ width: '48px', height: '48px', opacity: 0.3 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const Preview: React.FC<Props> = ({ description }) => {
  const { copy, toast } = useClipboard();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (description) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [description]);

  const hasContent = description && description.trim().length > 0;

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">실시간 미리보기</h2>
        {hasContent && (
          <button 
            className="btn btn-ghost btn-icon" 
            onClick={() => copy(description)}
            aria-label="설명 복사"
          >
            <CopyIcon />
          </button>
        )}
      </div>
      
      <div className="preview-container">
        <div className={`preview-content ${isAnimating ? 'fadeIn' : ''}`}>
          {hasContent ? (
            description
          ) : (
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '8rem',
              color: 'var(--color-text-muted)'
            }}>
              <EmptyStateIcon />
              <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
                폼을 작성하면 여기에 미리보기가 표시됩니다
              </p>
            </div>
          )}
        </div>
        {hasContent && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            padding: '0.25rem 0.75rem',
            background: 'var(--color-success)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: '600',
            borderRadius: 'var(--radius-sm)',
            animation: 'slideDown var(--transition-base)'
          }}>
            실시간 업데이트 중
          </div>
        )}
      </div>

      {toast && (
        <div className="toast toast-success">
          <CheckIcon />
          <span>{toast}</span>
        </div>
      )}

      <style>{`
        .fadeIn {
          animation: fadeIn var(--transition-base);
        }
      `}</style>
    </div>
  );
};