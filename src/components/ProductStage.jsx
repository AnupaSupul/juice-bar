import { timeline, exitDuration } from '../antigravity/config';

/**
 * ProductStage – Fullscreen fixed cinematic stage.
 * 4 independently animated transparent PNG objects + splash effect.
 *
 * All objects use absolute positioning with bottom alignment.
 * No wrappers, no backgrounds – pure transparent PNGs only.
 */
export default function ProductStage({ fruit, phase }) {
    const { assets } = fruit;

    const getStyle = (key, enterTransform) => {
        const tl = timeline[key];

        if (phase === 'exit') {
            return {
                transform: 'scale(0.8) translateY(30px)',
                opacity: 0,
                transition: `transform ${exitDuration}ms cubic-bezier(0.4, 0, 1, 1), opacity ${exitDuration * 0.6}ms ease`,
            };
        }

        if (phase === 'enter') {
            return {
                transform: enterTransform,
                opacity: 0,
                transition: 'none',
            };
        }

        // idle
        return {
            transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
            opacity: 1,
            transition: `transform ${tl.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms, opacity ${tl.duration * 0.7}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms`,
        };
    };

    const splashStyle = (() => {
        const tl = timeline.splash;
        if (phase === 'exit') return { transform: 'scale(0)', opacity: 0, transition: `all ${exitDuration}ms ease` };
        if (phase === 'enter') return { transform: 'scale(0)', opacity: 0, transition: 'none' };
        return {
            transform: 'scale(1)',
            opacity: 0.5,
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
        <div className="stage">
            {/* Splash – z-index 0, behind glass */}
            <div className="stage__splash" style={splashStyle}>
                <div className="stage__splash-burst" />
            </div>

            {/* Whole fruit – z-index 1, bottom left */}
            <div
                className={`stage__fruit-full ${phase === 'idle' ? 'stage__float-slow' : ''}`}
                style={getStyle('full', 'translateY(-150%) scale(0.7)')}
            >
                <img src={assets.full} alt="Fruit" draggable={false} />
            </div>

            {/* Half fruit – z-index 1, bottom right */}
            <div
                className={`stage__fruit-half ${phase === 'idle' ? 'stage__float-alt' : ''}`}
                style={getStyle('half', 'translateX(-120%) rotate(-90deg) scale(0.7)')}
            >
                <img src={assets.half} alt="Fruit half" draggable={false} />
            </div>

            {/* Bottle – z-index 2, center-left */}
            <div
                className={`stage__bottle ${phase === 'idle' ? 'stage__float' : ''}`}
                style={getStyle('bottle', 'translateY(-120%) scale(0.85)')}
            >
                <img src={assets.bottle} alt="Bottle" draggable={false} />
            </div>

            {/* Glass – z-index 3, slightly right */}
            <div
                className={`stage__glass ${phase === 'idle' ? 'stage__float-alt' : ''}`}
                style={getStyle('glass', 'translateX(100%) rotate(10deg)')}
            >
                <img src={assets.glass} alt="Glass" draggable={false} />
            </div>

            {/* Tagline – bottom center */}
            <div className="stage__tagline" style={taglineStyle}>
                <p className="stage__tagline-text">{fruit.tagline}</p>
                <div className="stage__tagline-line" />
            </div>
        </div>
    );
}
