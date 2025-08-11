import React, { useEffect, useState } from 'react';
import { Example } from '../data/examples';

interface Props {
  items: Example[];
  onSelect: (e: Example) => void;
}

export const Carousel: React.FC<Props> = ({ items, onSelect }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const next = () => setIndex(i => (i + 1) % items.length);
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="slide">
        <p><strong>What:</strong> {items[index].what}</p>
        <p><strong>Why:</strong> {items[index].why}</p>
        <button onClick={() => onSelect(items[index])}>이 예시로 불러오기</button>
      </div>
      <div className="controls">
        <button aria-label="prev" onClick={prev}>◀</button>
        <button aria-label="next" onClick={next}>▶</button>
      </div>
      <div className="dots">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            style={{ opacity: i === index ? 1 : 0.3 }}
          >•</button>
        ))}
      </div>
    </div>
  );
};
