import { timeline, exitDuration } from '../antigravity/config';

/**
 * ProductStage – Grounded Cinematic Composition
 * Strictly aligned, no floating, no independent parallax.
 */
export default function ProductStage({ fruit, phase }) {
    const { assets } = fruit;

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
            transition: `transform ${tl.duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${tl.delay}ms, opacity ${tl.duration}ms ease ${tl.delay}ms`,
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
                        <img src={assets.bottle} className="stage__img" alt="Bottle" draggable={false} />
                    </div>
                </div>

                {/* GLASS (Right) - Z:4 */}
                <div className="stage__layer stage__layer--glass">
                    <div
                        className="stage__animator"
                        style={getAnimatorStyle('glass', 'translateX(80%)')}
                    >
                        <img src={assets.glass} className="stage__img" alt="Glass" draggable={false} />
                    </div>
                </div>

                {/* WHOLE FRUIT (Left Base) - Z:5 */}
                <div className="stage__layer stage__layer--full">
                    <div
                        className="stage__animator"
                        style={getAnimatorStyle('full', 'translateY(100%)')}
                    >
                        <img src={assets.full} className="stage__img" alt="Fruit" draggable={false} />
                    </div>
                </div>

                {/* HALF FRUIT (Right Base) - Z:5 */}
                <div className="stage__layer stage__layer--half">
                    <div
                        className="stage__animator"
                        style={getAnimatorStyle('half', 'translateY(100%) rotate(-40deg)')}
                    >
                        <img src={assets.half} className="stage__img" alt="Fruit Half" draggable={false} />
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
