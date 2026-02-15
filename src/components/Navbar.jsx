import React, { useState, useEffect } from 'react';
import { fruits } from '../antigravity/config';

export default function Navbar({ activeIndex }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Current active fruit for theming
    const activeFruit = fruits[activeIndex] || fruits[0];
    const themeColor = activeFruit.bgColor; // Use the fruit's theme color

    // Scroll listener for glass effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
            style={{
                '--theme-color': themeColor,
                '--theme-glow': activeFruit.gradient
            }}
        >
            <div className="navbar__container">

                {/* LEFT: LOGO */}
                <div className="navbar__logo">
                    <span className="logo-text">FRUITIFY</span>
                    <div className="logo-glow" />
                </div>

                {/* CENTER: DESKTOP NAV */}
                <div className="navbar__links desktop-only">
                    <a href="#" className="nav-item">Home</a>

                    <div className="nav-item has-dropdown">
                        <span className="nav-text">Flavors</span>
                        <div className="nav-dropdown">
                            {fruits.map((fruit, i) => (
                                <a key={fruit.id} href={`#section-${i}`} className="dropdown-item">
                                    <span className="dropdown-icon" style={{ backgroundColor: fruit.bgColor }}></span>
                                    <span className="dropdown-text">{fruit.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <a href="#" className="nav-item">Products</a>
                    <a href="#" className="nav-item">Benefits</a>
                    <a href="#" className="nav-item">Contact</a>
                </div>

                {/* RIGHT: BUY BUTTON & MOBILE TOGGLE */}
                <div className="navbar__actions">
                    <button className="btn-buy">
                        <span>Buy Now</span>
                        <div className="btn-glow" />
                    </button>

                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                            <span></span><span></span><span></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-links">
                    <a href="#" onClick={() => setMobileMenuOpen(false)}>Home</a>
                    <a href="#" onClick={() => setMobileMenuOpen(false)}>Flavors</a>
                    <a href="#" onClick={() => setMobileMenuOpen(false)}>Products</a>
                    <a href="#" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </div>
            </div>
        </nav>
    );
}
