import React from 'react';
import { examples, Example } from '../data/examples';
import { Carousel } from './Carousel';
import { Preview } from './Preview';

interface Props {
  description: string;
  onSelectExample: (ex: Example) => void;
}

export const RightPane: React.FC<Props> = ({ description, onSelectExample }) => {
  return (
    <div>
      <h2>입력 예시</h2>
      <Carousel items={examples} onSelect={onSelectExample} />
      <Preview description={description} />
    </div>
  );
};
