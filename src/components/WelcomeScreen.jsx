import { useState } from 'react';
import './WelcomeScreen.css';

const CATEGORY_EMOJIS = {
  fruits: ['🍎', '🍌', '🍇', '🍊', '🍓', '🍑', '🍍', '🥝'],
  animals: ['🐶', '🐱', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁'],
  flags: ['🇧🇷', '🇺🇸', '🇯🇵', '🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸'],
  random: ['🌟', '🎮', '🎨', '🎭', '🎪', '🎯', '🎲', '🎱']
};

const WelcomeScreen = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('animals');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Por favor, digite seu nome');
      return;
    }
    onStart(playerName.trim(), null, CATEGORY_EMOJIS[selectedCategory]);
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1>🎮 Jogo da Memória</h1>
        
        <form onSubmit={handleSubmit} className="welcome-form">
          <div className="form-group">
            <label htmlFor="playerName">Seu nome:</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              placeholder="Digite seu nome"
              className={error ? 'error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Escolha uma categoria:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="animals">Animais {CATEGORY_EMOJIS.animals[0]}</option>
              <option value="fruits">Frutas {CATEGORY_EMOJIS.fruits[0]}</option>
              <option value="flags">Bandeiras {CATEGORY_EMOJIS.flags[0]}</option>
              <option value="random">Aleatório {CATEGORY_EMOJIS.random[0]}</option>
            </select>
          </div>

          <div className="emoji-preview">
            {CATEGORY_EMOJIS[selectedCategory].map((emoji, index) => (
              <span key={index} className="preview-emoji">{emoji}</span>
            ))}
          </div>

          <button type="submit" className="start-button">
            Começar Jogo 🎯
          </button>
        </form>
      </div>
    </div>
  );
};

export default WelcomeScreen;
