import * as React from 'react';

import { GameBoxContent } from '../../../types/index';

const Square: (
  { content, handleClick }: { content: GameBoxContent; handleClick: () => void }
) => JSX.Element = ({ content, handleClick }) => (
  <button className="square" onClick={handleClick}>
    {content}
  </button>
);

export default Square;
