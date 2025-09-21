import React from 'react';
import './RestartButton.css';

export default function RestartButton({ onRestart }) {
  return (
    <button className="restart-btn" onClick={onRestart}>
      Reiniciar Jogo
    </button>
  );
}
