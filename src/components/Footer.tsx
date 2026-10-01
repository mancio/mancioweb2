import IpPlaceTime from "./IpPlaceTime";
import {GITHUB_URL} from "../data/games";
import '../App.css';

function Footer(){
    return (
        <footer className="site-footer">
            <span>© {new Date().getFullYear()} Mancio · made with React and too much espresso ☕</span>
            <span className="site-footer-sep">·</span>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="site-footer-sep">·</span>
            <IpPlaceTime/>
        </footer>
    );
}

export default Footer;
