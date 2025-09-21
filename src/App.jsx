
import { useState, useEffect } from 'react';

import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import RestartButton from './components/RestartButton';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';
import { playSound } from './utils/sounds';

const DEFAULT_EMOJIS = ['🐶','🐱','🦊','🐻','🐼','🐨','🐯','🦁'];


function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function createCards(cardImages, emojis) {
  let items = [];
  const emojiArr = emojis && emojis.length === 8 ? emojis : DEFAULT_EMOJIS;
  items = emojiArr;
  const cards = [...items, ...items].map((item, idx) => ({
    id: idx,
    emoji: item,
    img: undefined,
  }));
  const shuffledCards = shuffle(cards);
  return shuffledCards;
}


function App() {
  const [playerName, setPlayerName] = useState('');
  const [cardImages, setCardImages] = useState(null);
  const [emojis, setEmojis] = useState(DEFAULT_EMOJIS);
  const [showWelcome, setShowWelcome] = useState(true);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [bgVolume, setBgVolume] = useState(0.15);
  const [fxVolume, setFxVolume] = useState(0.35);


  useEffect(() => {
    if (!showWelcome) {
      setCards(createCards(cardImages, emojis));
      document.body.classList.remove('welcome-bg');
      if (window.sounds?.background) {
        window.sounds.background.volume = isMuted ? 0 : bgVolume;
        window.sounds.background.play().catch(() => {});
      }
    } else {
      document.body.classList.add('welcome-bg');
      if (window.sounds?.background) {
        window.sounds.background.pause();
        window.sounds.background.currentTime = 0;
      }
    }
    return () => {
      document.body.classList.remove('welcome-bg');
      if (window.sounds?.background) {
        window.sounds.background.pause();
        window.sounds.background.currentTime = 0;
      }
    };
  }, [showWelcome, cardImages, emojis, isMuted, bgVolume]);
  useEffect(() => {
    if (window.sounds) {
      Object.keys(window.sounds).forEach(key => {
        if (key !== 'background') {
          window.sounds[key].volume = isMuted ? 0 : fxVolume;
        }
      });
    }
  }, [isMuted, fxVolume]);


  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setMoves(m => m + 1);
      const [first, second] = flipped;
      const cardA = cards[first];
      const cardB = cards[second];
      const match = cardA.emoji && cardB.emoji && cardA.emoji === cardB.emoji;
      const matchImg = cardA.img && cardB.img && cardA.img.name === cardB.img.name;
      if (match || matchImg) {
        playSound('flipcard');
        setTimeout(() => {
          setMatched(m => [...m, first, second]);
          setFlipped([]);
          setDisabled(false);
        }, 800);
      } else {
        playSound('fail');
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 800);
      }
    }
  }, [flipped, cards]);


  const handleCardClick = idx => {
    if (flipped.length < 2 && !flipped.includes(idx) && !matched.includes(idx)) {
      playSound('flipcard');
      setFlipped(f => [...f, idx]);
    }
  };

  const handleRestart = () => {
    setCards(createCards(cardImages, emojis));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
  };


  const handleStart = (name, images, selectedEmojis) => {
    setPlayerName(name);
    setCardImages(images);
    setEmojis(selectedEmojis || DEFAULT_EMOJIS);
    setCards(createCards(images, selectedEmojis || DEFAULT_EMOJIS));
    setShowWelcome(false);
  };

  const handleBackToWelcome = () => {
    setShowWelcome(true);
    setPlayerName('');
    setCardImages(null);
    setEmojis(DEFAULT_EMOJIS);
    setCards([]);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="memory-game">
      <div className="memory-content">
        <button
          className="toggle-header-btn"
          style={{position:'fixed', top:10, right:18, zIndex:20, background:'#fff', color:'#357a38', border:'1px solid #e0e0e0', borderRadius:8, padding:'7px 16px', fontSize:'1.5em', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}
          onClick={() => setShowHeader(h => !h)}
          title={showHeader ? 'Ocultar barra' : 'Exibir barra'}
        >
          {showHeader ? '👁️' : '🙈'}
        </button>
        <button
          className="settings-btn"
          style={{position:'fixed', top:10, left:18, zIndex:20, background:'rgba(255,255,255,0.7)', color:'#357a38', border:'1px solid #e0e0e0', borderRadius:8, padding:'7px 14px', fontSize:'1.5em', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(60,60,60,0.05)', transition:'background 0.2s, color 0.2s', opacity:0.7}}
          onClick={() => setShowSettings(s => !s)}
          title="Configurações de áudio"
        >
          <span style={{fontSize:'1.5em'}}>⚙️</span>
        </button>

        {showSettings && (
          <div className="settings-panel" style={{position:'fixed', top:56, left:18, zIndex:30, background:'#fff', border:'1px solid #e0e0e0', borderRadius:12, boxShadow:'0 4px 24px rgba(60,60,60,0.12)', padding:'24px 22px', minWidth:260}}>
            <h3 style={{marginTop:0, marginBottom:12, color:'#357a38', fontSize:'1.2em'}}>Configurações de Áudio</h3>
            <div style={{marginBottom:14}}>
              <label style={{display:'flex', alignItems:'center', gap:8}}>
                <input type="checkbox" checked={isMuted} onChange={e => setIsMuted(e.target.checked)} />
                <span>Mute geral</span>
              </label>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{display:'flex', alignItems:'center', gap:8}}>
                <span>Música de fundo</span>
                <input type="range" min={0} max={1} step={0.01} value={bgVolume} onChange={e => setBgVolume(Number(e.target.value))} style={{flex:1}} />
                <span>{Math.round(bgVolume*100)}%</span>
              </label>
            </div>
            <div style={{marginBottom:18}}>
              <label style={{display:'flex', alignItems:'center', gap:8}}>
                <span>Efeitos sonoros</span>
                <input type="range" min={0} max={1} step={0.01} value={fxVolume} onChange={e => setFxVolume(Number(e.target.value))} style={{flex:1}} />
                <span>{Math.round(fxVolume*100)}%</span>
              </label>
            </div>
            <button
              className="back-welcome-btn"
              style={{background:'#f5f5f5', color:'#357a38', border:'1px solid #e0e0e0', borderRadius:8, padding:'6px 14px', fontSize:'1em', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(60,60,60,0.05)', transition:'background 0.2s, color 0.2s', opacity:0.9}}
              onClick={handleBackToWelcome}
              title="Alterar nome e imagens"
            >
              <span style={{fontSize:'1.2em', marginRight:4}}>🔄</span> Alterar jogador
            </button>
          </div>
        )}
        {showHeader && (
          <header className="memory-header">
            <h1>Jogo da Memória</h1>
            <div style={{fontSize: '1.1em', color: '#ffffff', marginBottom: 4, textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}>Jogador: {playerName}</div>
            <Scoreboard moves={moves} pairsFound={matched.length / 2} totalPairs={DEFAULT_EMOJIS.length} />
          </header>
        )}
        <Board
          cards={cards}
          flippedCards={flipped}
          matchedCards={matched}
          onCardClick={handleCardClick}
          disabled={disabled}
        />
        <RestartButton onRestart={handleRestart} />
        {matched.length === cards.length && cards.length > 0 && (
          <div className="win-overlay">
            <div className="win-message">
              <h2>🎉 Parabéns, {playerName}! 🎉</h2>
              <p>Você encontrou todos os pares em {moves} movimentos!</p>
              <div className="win-buttons">
                <button onClick={() => {
                  playSound('victory');
                  handleRestart();
                }} className="restart-button">
                  Jogar Novamente 🔄
                </button>
                <button onClick={() => {
                  playSound('victory');
                  handleBackToWelcome();
                }} className="change-player-button">
                  Trocar Jogador 👤
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
