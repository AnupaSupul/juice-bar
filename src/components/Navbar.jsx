import React, { useState, useEffect } from 'react';
import { fruits } from '../antigravity/config';

export default function Navbar({ activeIndex }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Current active fruit for theming
    const activeFruit = fruits[activeIndex] || fruits[0];
    const themeColor = activeFruit.bgColor;

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20); // Sensitive scroll
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
                style={{ '--theme-color': themeColor }}
            >
                {/* LEFT: LOGO */}
                <div className="navbar__logo">
                    FRUITIFY
                </div>

                {/* CENTER: NAV LINKS */}
                <div className="navbar__center">
                    <a href="#" className="nav-item">Home</a>

                    <div className="nav-item has-dropdown">
                        <span>Flavors</span>
                        <div className="nav-dropdown">
                            {fruits.map((fruit, i) => (
                                <a key={fruit.id} href={`#section-${i}`} className="dropdown-item">
                                    <span
                                        className="dropdown-icon"
                                        style={{ backgroundColor: fruit.bgColor }}
                                    />
                                    {fruit.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    <a href="#" className="nav-item">Products</a>
                    <a href="#" className="nav-item">Benefits</a>
                    <a href="#section-contact" className="nav-item">Contact</a>
                </div>

                {/* RIGHT: BUY & TOGGLE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn-buy">
                        Buy Now
                    </button>

                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                            <span></span><span></span><span></span>
                        </div>
                    </button>
                </div>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-links">
                    <a href="#" onClick={() => setMobileMenuOpen(false)}>Home</a>
                    <a href="#" onClick={() => setMobileMenuOpen(false)}>Flavors</a>
                    <a href="#" onClick={() => setMobileMenuOpen(false)}>Products</a>
                    <a href="#section-contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                    <button
                        className="btn-buy"
                        style={{ marginTop: '2rem', transform: 'scale(1.2)' }}
                    >
                        Purchase
                    </button>
                </nav>
            </div>
        </>
    );
}
