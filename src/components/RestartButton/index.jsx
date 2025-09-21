import './RestartButton.css';

const RestartButton = ({ onRestart }) => {
  return (
    <button className="restart-button" onClick={onRestart} title="Reiniciar jogo">
      🔄 Reiniciar
    </button>
  );
};

export default RestartButton;