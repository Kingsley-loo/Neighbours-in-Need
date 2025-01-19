import logo from './logo.svg';
import './Navbar.css';
// Supports weights 100-700
import '@fontsource/fira-sans-extra-condensed';

function Navbar() {
    return (
        <div className="Navbar">
            <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Service Finder</a></li>
            <li><a href="">Contact</a></li>
            <li><a href="">About</a></li>
            </ul>
        </div>
    );
}

export default Navbar