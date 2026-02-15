import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { timeline, exitDuration } from '../antigravity/config';

/**
 * ProductStage – Grounded Cinematic Composition
 * Strictly aligned, no floating, no independent parallax.
 */
export default function ProductStage({ fruit, phase }) {
    const { assets } = fruit;

    // Parallax Refs
    const bottleRef = useRef(null);
    const glassRef = useRef(null);
    const fullRef = useRef(null);
    const halfRef = useRef(null);

    // Mouse Parallax Logic
    useEffect(() => {
        if (!bottleRef.current || !glassRef.current) return;

        // Setup quickTo for performance (avoid garbage collection issues)
        const bottleTo = {
            x: gsap.quickTo(bottleRef.current, "x", { duration: 0.5, ease: "power3.out" }),
            y: gsap.quickTo(bottleRef.current, "y", { duration: 0.5, ease: "power3.out" }),
            r: gsap.quickTo(bottleRef.current, "rotation", { duration: 0.5, ease: "power3.out" }),
        };
        const glassTo = {
            x: gsap.quickTo(glassRef.current, "x", { duration: 0.6, ease: "power3.out" }),
            y: gsap.quickTo(glassRef.current, "y", { duration: 0.6, ease: "power3.out" }),
            r: gsap.quickTo(glassRef.current, "rotation", { duration: 0.6, ease: "power3.out" }),
        };
        const fullTo = {
            x: gsap.quickTo(fullRef.current, "x", { duration: 0.7, ease: "power3.out" }),
            y: gsap.quickTo(fullRef.current, "y", { duration: 0.7, ease: "power3.out" }),
            r: gsap.quickTo(fullRef.current, "rotation", { duration: 0.7, ease: "power3.out" }),
        };
        const halfTo = {
            x: gsap.quickTo(halfRef.current, "x", { duration: 0.8, ease: "power3.out" }),
            y: gsap.quickTo(halfRef.current, "y", { duration: 0.8, ease: "power3.out" }),
            r: gsap.quickTo(halfRef.current, "rotation", { duration: 0.8, ease: "power3.out" }),
        };

        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            // Normalize -1 to 1
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;

            // Apply Parallax (Different speeds for depth)
            // Bottle (Back) - Low Movement
            bottleTo.x(x * 15);
            bottleTo.y(y * 15);
            bottleTo.r(x * 2);

            // Glass (Mid) - Medium Movement
            glassTo.x(x * 25);
            glassTo.y(y * 25);
            glassTo.r(x * 3);

            // Full Fruit (Front Left) - High Movement
            fullTo.x(x * 35);
            fullTo.y(y * 35);
            fullTo.r(x * 4);

            // Half Fruit (Front Right) - Highest Movement
            halfTo.x(x * 45);
            halfTo.y(y * 45);
            halfTo.r(x * 5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // --- Animation Styles Helper ---
    const getAnimatorStyle = (key, enterTransform) => {
        const tl = timeline[key];

        if (phase === 'exit') {
            // Exit: All shrink slightly and fade up/out
            return {
                transform: 'translateY(-30px) scale(0.95)',
                opacity: 0,
                transition: `transform ${exitDuration}ms cubic-bezier(0.4, 0, 1, 1), opacity ${exitDuration}ms ease`,
            };
        }

        if (phase === 'enter') {
            // Enter: Start from specific requested positions
            return {
                transform: enterTransform,
                opacity: key === 'glass' ? 0 : 1, // Glass uses opacity fade
                transition: 'none',
            };
        }

        // Idle - STATIC GROUNDED (No float)
        return {
            transform: 'translateY(0) scale(1) rotate(0deg)',
            opacity: 1,
            transition: `transform ${tl.duration}ms cubic-bezier(0.22, 1, 0.3, 1) ${tl.delay}ms, opacity ${tl.duration}ms ease ${tl.delay}ms`,
        };
    };

    // --- Splash Logic ---
    const splashStyle = (() => {
        const tl = timeline.splash;
        if (phase === 'exit') return { transform: 'translateX(-50%) scale(0.8)', opacity: 0, transition: `all ${exitDuration}ms ease` };
        if (phase === 'enter') return { transform: 'translateX(-50%) scale(0.5)', opacity: 0, transition: 'none' };

        // Pulse/Enter
        return {
            transform: 'translateX(-50%) scale(1.2)',
            opacity: 0.6,
            transition: `transform ${tl.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms, opacity ${tl.duration}ms ease ${tl.delay}ms`,
        };
    })();

    const taglineStyle = (() => {
        const tl = timeline.tagline;
        if (phase === 'idle') {
            return {
                opacity: 1,
                transform: 'translateY(0)',
                transition: `opacity ${tl.duration}ms ease ${tl.delay}ms, transform ${tl.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms`,
            };
        }
        return {
            opacity: 0,
            transform: 'translateY(20px)',
            transition: phase === 'exit' ? `all ${exitDuration * 0.4}ms ease` : 'none',
        };
    })();

    return (
        <div className="product-stage">

            {/* COMPOSITION CONTAINER */}
            <div className="product-composition">

                {/* SPLASH (Behind) */}
                <div className="stage__splash" style={splashStyle}>
                    <div className="stage__splash-burst" />
                </div>

                {/* BOTTLE (Center) - Z:3 */}
                <div className="stage__layer stage__layer--bottle">
                    <div
                        className="stage__animator"
                        style={getAnimatorStyle('bottle', 'translateY(-120%)')}
                    >
                        <img ref={bottleRef} src={assets.bottle} className="stage__img" alt="Bottle" draggable={false} />
                    </div>
                </div>

                {/* GLASS (Right) - Z:4 */}
                <div className="stage__layer stage__layer--glass">
                    <div
                        className="stage__animator"
                        style={getAnimatorStyle('glass', 'translateX(80%)')}
                    >
                        <img ref={glassRef} src={assets.glass} className="stage__img" alt="Glass" draggable={false} />
                    </div>
                </div>

                {/* WHOLE FRUIT (Left Base) - Z:5 */}
                <div className="stage__layer stage__layer--full">
                    <div
                        className="stage__animator"
                        style={getAnimatorStyle('full', 'translateY(100%)')}
                    >
                        <img ref={fullRef} src={assets.full} className="stage__img" alt="Fruit" draggable={false} />
                    </div>
                </div>

                {/* HALF FRUIT (Right Base) - Z:5 */}
                <div className="stage__layer stage__layer--half">
                    <div
                        className="stage__animator"
                        style={getAnimatorStyle('half', 'translateY(100%) rotate(-40deg)')}
                    >
                        <img ref={halfRef} src={assets.half} className="stage__img" alt="Fruit Half" draggable={false} />
                    </div>
                </div>

            </div>

            {/* TAGLINE */}
            <div className="stage__tagline" style={taglineStyle}>
                <p className="stage__tagline-text">{fruit.tagline}</p>
                <div className="stage__tagline-line" />
            </div>

        </div>
    );
}
