import Card from '../Card';
import './Board.css';

const Board = ({ cards, flippedCards, matchedCards, onCardClick, disabled }) => {
  const isFlipped = (idx) => flippedCards.includes(idx) || matchedCards.includes(idx);

  return (
    <div className="memory-board">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          index={idx}
          emoji={card.emoji}
          image={card.img}
          isFlipped={isFlipped(idx)}
          isMatched={matchedCards.includes(idx)}
          onClick={() => !disabled && onCardClick(idx)}
          disabled={disabled || isFlipped(idx)}
        />
      ))}
    </div>
  );
};

export default Board;