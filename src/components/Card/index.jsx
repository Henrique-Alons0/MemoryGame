import './Card.css';

const Card = ({ index, emoji, image, isFlipped, isMatched, onClick, disabled }) => {
  return (
    <div
      className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={() => !disabled && onClick(index)}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <div className="memory-card-inner">
        <div className="memory-card-front">
          <span>?</span>
        </div>
        <div className="memory-card-back">
          {emoji ? (
            <span className="emoji">{emoji}</span>
          ) : image ? (
            <img src={image} alt="card" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;