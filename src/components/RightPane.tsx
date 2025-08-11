import React from 'react';
import { examples, Example } from '../data/examples';
import { Carousel } from './Carousel';

interface Props {
  onSelectExample: (ex: Example) => void;
}

export const RightPane: React.FC<Props> = ({ onSelectExample }) => {
  return <Carousel items={examples} onSelect={onSelectExample} />;
};