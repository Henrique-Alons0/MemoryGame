import React from 'react';
import './Card.css';

export default function Card({ card, onClick, flipped, disabled }) {
  return (
    <div className={`card${flipped ? ' flipped' : ''}`} onClick={disabled ? undefined : onClick}>
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">
          {card.img ? (
            <img
              src={URL.createObjectURL(card.img)}
              alt="Carta personalizada"
              style={{ width: '70%', height: '70%', objectFit: 'contain', borderRadius: '8px' }}
            />
          ) : (
            card.emoji
          )}
        </div>
      </div>
    </div>
  );
}
