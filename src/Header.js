import logo from './logo.svg';
import './Header.css';
import Navbar from './Navbar';
// Supports weights 100-700
import '@fontsource/fira-sans-extra-condensed';

function Header() {
    return (
        <div className="Header">
                        <img src="/android-chrome-192x192.png" alt="logo" id="home"/>
            <h1>Neighbours In Need</h1>
            <Navbar />
        
        </div>

    );
    




}

export default Header;