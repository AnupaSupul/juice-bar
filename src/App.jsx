import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fruits } from './antigravity/config';
import { useActiveSection, useCinematicTransition } from './antigravity/index';
import ProductStage from './components/ProductStage';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import './index.css';
import './premium.css';

export default function App() {
  const { activeIndex, setRef } = useActiveSection(fruits.length);
  const { displayIndex, phase } = useCinematicTransition(activeIndex);

  const displayFruit = fruits[displayIndex];
  const activeFruit = fruits[activeIndex];

  /*
  // Two-frame trick for enter animation:
  // Render at "from" positions on 'enter' phase, then force to 'idle'
  // so CSS transitions animate to resting positions.
  */
  const appRef = useRef(null);
  const lenisRef = useRef(null);

  // --- LENIS SMOOTH SCROLL MANUAL SETUP ---
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 2. Connect to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Bind to GSAP Ticker for smooth animation frame syncing
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable GSAP internal lag smoothing for Lenis
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // --- PARALLAX SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      // Calculate 0-1 progress relative to window height (repeating per section)
      // This drives the subtle parallax "float" effect during scroll
      const progress = (window.scrollY % window.innerHeight) / window.innerHeight;
      if (appRef.current) {
        appRef.current.style.setProperty('--scroll-p', progress.toFixed(3));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- PHASE MANAGEMENT ---
  useEffect(() => {
    if (phase === 'enter') {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (appRef.current) {
            appRef.current.setAttribute('data-phase', 'idle');
          }
        });
      });
    }
  }, [phase, displayIndex]);

  return (
    <div className="app" ref={appRef} data-phase={phase}>
      <Preloader />

      {/* Premium Navigation */}
      <Navbar activeIndex={activeIndex} />

      {/* Fixed background – follows activeIndex instantly */}
      <Background fruit={activeFruit} phase={phase} />

      {/* Fixed cinematic stage – follows displayIndex for smooth lifecycle */}
      <ProductStage fruit={displayFruit} phase={phase} />

      {/* Scroll sentinel sections */}
      <div className="sections">
        {fruits.map((fruit, i) => (
          <div
            key={fruit.id}
            ref={setRef(i)}
            className="scroll-section"
            id={`section-${i}`}
            data-index={i}
          >
            {i === 0 && (
              <div className="scroll-indicator">
                <span className="scroll-indicator__text">Scroll to explore</span>
                <div className="scroll-indicator__line" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
