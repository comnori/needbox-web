import React, { useState } from 'react';
import { Example } from '../data/examples';

interface Props {
  items: Example[];
  onSelect: (e: Example) => void;
}

const ChevronLeftIcon = () => (
  <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ImportIcon = () => (
  <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

export const Carousel: React.FC<Props> = ({ items, onSelect }) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex(i => (i + 1) % items.length);
  };

  const prev = () => {
    setIndex(i => (i - 1 + items.length) % items.length);
  };

  const goToSlide = (i: number) => {
    setIndex(i);
  };

  const currentItem = items[index];

  return (
    <div className="carousel-container">
      <div className="card-header" style={{ marginBottom: '0.5rem' }}>
        <h2 className="card-title">예시 모음</h2>
        <div style={{ 
          fontSize: '0.8125rem', 
          color: 'var(--color-text-secondary)',
          fontWeight: '500'
        }}>
          {index + 1} / {items.length}
        </div>
      </div>

      <div className="carousel-slide" key={index}>
        <div className="carousel-content">
          <div style={{ marginBottom: '1rem' }}>
            <div className="carousel-label">💡 무엇을 원하시나요?</div>
            <div className="carousel-text">{currentItem.what}</div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="carousel-label">🎯 주요 목적을 알려주세요</div>
            <div className="carousel-text">{currentItem.why}</div>
          </div>

          {currentItem.who && currentItem.who.length > 0 && (
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem', 
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}>
              <div className="carousel-label" style={{ width: '100%', marginBottom: '0.5rem' }}>👥 누가 사용하나요?</div>
              {currentItem.who.map((person, i) => (
                <span 
                  key={i}
                  style={{
                    padding: '0.25rem 0.75rem',
                    background: 'var(--color-primary-light)',
                    color: 'var(--color-primary)',
                    fontSize: '0.8125rem',
                    fontWeight: '500',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  {person}
                </span>
              ))}
            </div>
          )}

          {currentItem.where && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="carousel-label">📍 어느 화면에서 사용하나요?</div>
              <div className="carousel-text" style={{ fontSize: '0.9rem' }}>{currentItem.where}</div>
            </div>
          )}

          {currentItem.when && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="carousel-label">⏰ 언제까지 필요한가요?</div>
              <div className="carousel-text" style={{ fontSize: '0.9rem' }}>{currentItem.when}</div>
            </div>
          )}

          {currentItem.how && (
            <div style={{ marginBottom: '1rem' }}>
              <div className="carousel-label">🔧 어떻게 구현하면 좋을까요?</div>
              <div className="carousel-text" style={{ fontSize: '0.9rem' }}>{currentItem.how}</div>
            </div>
          )}
        </div>

        <button 
          className="btn btn-primary" 
          onClick={() => onSelect(currentItem)}
          style={{ width: '100%' }}
        >
          <ImportIcon />
          이 예시로 불러오기
        </button>
      </div>

      <div className="carousel-controls">
        <div className="carousel-nav">
          <button 
            className="btn btn-ghost btn-icon" 
            aria-label="이전 슬라이드" 
            onClick={prev}
          >
            <ChevronLeftIcon />
          </button>
          <button 
            className="btn btn-ghost btn-icon" 
            aria-label="다음 슬라이드" 
            onClick={next}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      <div className="carousel-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === index ? 'carousel-dot-active' : ''}`}
            aria-label={`슬라이드 ${i + 1}로 이동`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};