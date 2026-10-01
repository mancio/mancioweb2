import '../App.css';
import { useNavigate } from 'react-router-dom';
import {DICE, FART, HOW_OLD, KITCHEN_TOOLS, RECIPES, SCORE_COUNTER, STOCKS, TEMP} from "../logic/Names";
import {GITHUB_URL, PUBLISHED_GAMES} from "../data/games";

interface Tile {
    emoji: string;
    title: string;
    blurb: string;
    go: () => void;
}

function TileGrid({tiles}: {tiles: Tile[]}){
    return (
        <div className="tile-grid">
            {tiles.map(tile => (
                <button key={tile.title} className="tile" onClick={tile.go}>
                    <span className="tile-emoji" aria-hidden="true">{tile.emoji}</span>
                    <span className="tile-title">{tile.title}</span>
                    <span className="tile-blurb">{tile.blurb}</span>
                </button>
            ))}
        </div>
    );
}

function openExternal(url: string){
    window.open(url, '_blank', 'noopener,noreferrer');
}

function Menu(){

    const navigate = useNavigate();

    const playHere: Tile[] = [
        {emoji: '🎲', title: 'Dice', blurb: 'Roll them. Blame them.', go: () => navigate(DICE)},
        {emoji: '💨', title: 'Fart&Run', blurb: 'Exactly what it sounds like.', go: () => navigate(FART)},
        {emoji: '🃏', title: 'Score Counter', blurb: 'Briscola and Scopa, no cheating.', go: () => navigate(SCORE_COUNTER)},
        {emoji: '🎂', title: 'How Old', blurb: 'The math nobody wants to do.', go: () => navigate(HOW_OLD)},
    ];

    const otherStuff: Tile[] = [
        {emoji: '🍝', title: 'Recipes', blurb: 'Tested on real Italians.', go: () => navigate(RECIPES)},
        {emoji: '🥖', title: 'Kitchen Tools', blurb: 'Dough hydration and friends.', go: () => navigate(KITCHEN_TOOLS)},
        {emoji: '🌡️', title: 'TempCasina', blurb: 'Live temperature from the casina.', go: () => navigate(TEMP)},
        {emoji: '📈', title: 'Stocks', blurb: 'Numbers going up (hopefully).', go: () => window.location.assign(STOCKS)},
        {emoji: '🧠', title: 'Karpathy Lessons', blurb: 'My notes on building neural nets.', go: () => openExternal('https://karpathy-by-mancio-586e3f.gitlab.io')},
    ];

    return(
        <div className="home">
            <header className="hero">
                <h1 className="hero-logo">Mancio</h1>
                <p className="hero-tagline">Hi, I'm Mancio 👋 I build games and silly little web toys.</p>
                <p className="hero-sub">Developer by day, game maker by night, pasta enthusiast always.</p>
                <div className="hero-actions">
                    <a className="btn btn-primary" href="#games">🎮 See my games</a>
                    <a className="btn btn-ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </header>

            <section id="games" className="section">
                <h2 className="section-title">Games I've published</h2>
                {PUBLISHED_GAMES.length > 0 ? (
                    <div className="tile-grid">
                        {PUBLISHED_GAMES.map(game => (
                            <a key={game.title} className="tile game-card" href={game.url} target="_blank" rel="noopener noreferrer">
                                <span className="tile-emoji" aria-hidden="true">{game.emoji}</span>
                                <span className="tile-title">{game.title}</span>
                                <span className="tile-blurb">{game.pitch}</span>
                                <span className="game-platform">{game.platform} · Play ▶</span>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="tile coming-soon">
                        <span className="tile-emoji" aria-hidden="true">🚧</span>
                        <span className="tile-title">Coming soon</span>
                        <span className="tile-blurb">The games are loading... please insert coin.</span>
                    </div>
                )}
            </section>

            <section className="section">
                <h2 className="section-title">Play right here</h2>
                <TileGrid tiles={playHere}/>
            </section>

            <section className="section">
                <h2 className="section-title">Kitchen &amp; other stuff</h2>
                <TileGrid tiles={otherStuff}/>
            </section>
        </div>
    );
}

export default Menu;
