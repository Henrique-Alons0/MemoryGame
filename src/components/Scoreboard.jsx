import React from 'react';
import './Scoreboard.css';

export default function Scoreboard({ moves, pairsFound, totalPairs }) {
  return (
    <div className="scoreboard">
      <span>Jogadas: {moves}</span>
      <span>Pares encontrados: {pairsFound} / {totalPairs}</span>
    </div>
  );
}
