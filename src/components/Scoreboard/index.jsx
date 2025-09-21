import { useState } from 'react';
import './Scoreboard.css';

const Scoreboard = ({ moves, pairsFound, totalPairs }) => {
  return (
    <div className="scoreboard">
      <div className="score-item">
        <span className="score-label">Movimentos:</span>
        <span className="score-value">{moves}</span>
      </div>
      <div className="score-item">
        <span className="score-label">Pares encontrados:</span>
        <span className="score-value">{pairsFound} / {totalPairs}</span>
      </div>
    </div>
  );
};

export default Scoreboard;