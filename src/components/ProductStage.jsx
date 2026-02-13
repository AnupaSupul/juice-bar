import { timeline, exitDuration } from '../antigravity/config';

/**
 * ProductStage – Pure Transparent Rendering.
 * Cinematic Cluster Layout.
 */
export default function ProductStage({ fruit, phase }) {
    const { assets } = fruit;

    // IMPORTANT: Animations must PRESERVE the base CSS transform (centering)
    const getBottleStyle = () => {
        const tl = timeline.bottle;
        const base = 'translateX(-50%)';

        if (phase === 'exit') {
            return {
                transform: `${base} translateY(-120%) scale(0.9)`,
                opacity: 0,
                transition: `transform ${exitDuration}ms cubic-bezier(0.4, 0, 1, 1), opacity ${exitDuration}ms ease`,
            };
        }
        if (phase === 'enter') {
            return {
                transform: `${base} translateY(-120%)`,
                opacity: 0,
                transition: 'none',
            };
        }
        return {
            transform: `${base} translateY(0) scale(1)`,
            opacity: 1,
            transition: `transform ${tl.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms, opacity ${tl.duration * 0.7}ms ease ${tl.delay}ms`,
        };
    };

    const getGlassStyle = () => {
        const tl = timeline.glass;
        const base = 'translateX(-50%)';

        if (phase === 'exit') {
            return {
                transform: `${base} translateX(50%) rotate(10deg)`,
                opacity: 0,
                transition: `transform ${exitDuration}ms cubic-bezier(0.4, 0, 1, 1), opacity ${exitDuration}ms ease`,
            };
        }
        if (phase === 'enter') {
            return {
                transform: `${base} translateX(50%) rotate(10deg)`,
                opacity: 0,
                transition: 'none',
            };
        }
        return {
            transform: `${base} translateX(0) rotate(0deg)`,
            opacity: 1,
            transition: `transform ${tl.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms, opacity ${tl.duration * 0.7}ms ease ${tl.delay}ms`,
        };
    };

    const getFullFruitStyle = () => {
        const tl = timeline.full;
        // No base transform

        if (phase === 'exit') {
            return {
                transform: 'translateY(100%) scale(0.8)',
                opacity: 0,
                transition: `transform ${exitDuration}ms cubic-bezier(0.4, 0, 1, 1), opacity ${exitDuration}ms ease`,
            };
        }
        if (phase === 'enter') {
            return {
                transform: 'translateY(100%) scale(0.8)',
                opacity: 0,
                transition: 'none',
            };
        }
        return {
            transform: 'translateY(0) scale(1)',
            opacity: 1,
            transition: `transform ${tl.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms, opacity ${tl.duration * 0.7}ms ease ${tl.delay}ms`,
        };
    };

    const getHalfFruitStyle = () => {
        const tl = timeline.half;
        // No base transform

        if (phase === 'exit') {
            return {
                transform: 'translateX(50%) rotate(-90deg)',
                opacity: 0,
                transition: `transform ${exitDuration}ms cubic-bezier(0.4, 0, 1, 1), opacity ${exitDuration}ms ease`,
            };
        }
        if (phase === 'enter') {
            return {
                transform: 'translateX(50%) rotate(-90deg)',
                opacity: 0,
                transition: 'none',
            };
        }
        return {
            transform: 'translateX(0) rotate(0deg)',
            opacity: 1,
            transition: `transform ${tl.duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${tl.delay}ms, opacity ${tl.duration * 0.7}ms ease ${tl.delay}ms`,
        };
    };

    const splashStyle = (() => {
        const tl = timeline.splash;
        if (phase === 'exit') return { transform: 'translateX(-50%) scale(0)', opacity: 0, transition: `all ${exitDuration}ms ease` };
        if (phase === 'enter') return { transform: 'translateX(-50%) scale(0)', opacity: 0, transition: 'none' };
        return {
            transform: 'translateX(-50%) scale(1)',
            opacity: 1,
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
            <div className="stage__splash" style={splashStyle}>
                <div className="stage__splash-burst" />
            </div>

            <div
                className={`stage__object stage__bottle ${phase === 'idle' ? 'stage__float' : ''}`}
                style={getBottleStyle()}
            >
                <img src={assets.bottle} alt="Bottle" draggable={false} />
            </div>

            <div
                className={`stage__object stage__glass ${phase === 'idle' ? 'stage__float-alt' : ''}`}
                style={getGlassStyle()}
            >
                <img src={assets.glass} alt="Glass" draggable={false} />
            </div>

            <div
                className={`stage__object stage__fruit-full ${phase === 'idle' ? 'stage__float-slow' : ''}`}
                style={getFullFruitStyle()}
            >
                <img src={assets.full} alt="Fruit" draggable={false} />
            </div>

            <div
                className={`stage__object stage__fruit-half ${phase === 'idle' ? 'stage__float-alt' : ''}`}
                style={getHalfFruitStyle()}
            >
                <img src={assets.half} alt="Fruit half" draggable={false} />
            </div>

            <div className="stage__tagline" style={taglineStyle}>
                <p className="stage__tagline-text">{fruit.tagline}</p>
                <div className="stage__tagline-line" />
            </div>
        </div>
    );
}
