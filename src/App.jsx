import { useEffect, useRef } from 'react';
import { fruits } from './antigravity/config';
import { useActiveSection, useCinematicTransition } from './antigravity/index';
import ProductStage from './components/ProductStage';
import Background from './components/Background';
import Navbar from './components/Navbar';
import './index.css';

export default function App() {
  const { activeIndex, setRef } = useActiveSection(fruits.length);
  const { displayIndex, phase } = useCinematicTransition(activeIndex);

  const displayFruit = fruits[displayIndex];
  const activeFruit = fruits[activeIndex];

  // Two-frame trick for enter animation:
  // Render at "from" positions on 'enter' phase, then force to 'idle'
  // so CSS transitions animate to resting positions.
  const appRef = useRef(null);

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

  useEffect(() => {
    if (phase === 'enter') {
      // Wait one frame for the "enter" (from) positions to paint,
      // then switch data-phase to 'idle' so CSS transitions kick in.
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
