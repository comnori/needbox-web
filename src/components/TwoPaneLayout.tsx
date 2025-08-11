import React from 'react';
import './TwoPaneLayout.css';

type Props = {
  left: React.ReactNode;
  right: React.ReactNode;
};

export const TwoPaneLayout: React.FC<Props> = ({ left, right }) => {
  return (
    <div className="two-pane">
      <div className="pane left">{left}</div>
      <div className="pane right">{right}</div>
    </div>
  );
};
