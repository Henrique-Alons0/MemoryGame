import React from 'react';
import Card from './Card';
import './Board.css';

export default function Board({ cards, flippedCards, matchedCards, onCardClick, disabled }) {
  return (
    <div className="board">
      {cards.map((card, idx) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(idx)}
          flipped={flippedCards.includes(idx) || matchedCards.includes(idx)}
          disabled={disabled || matchedCards.includes(idx)}
        />
      ))}
    </div>
  );
}
