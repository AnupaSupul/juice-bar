import { animationPresets } from '../antigravity/config';

/**
 * ProductDisplay – A SINGLE fixed container.
 * Renders ONE image at a time. When `phase` changes,
 * CSS transitions handle the animation.
 *
 * Props:
 *  - fruit: the fruit object to display
 *  - phase: 'idle' | 'exit' | 'enter'
 *  - animationType: which animation preset to use
 */
export default function ProductDisplay({ fruit, phase, animationType }) {
    const preset = animationPresets[animationType] || animationPresets.drop;

    // Determine transform + opacity based on phase
    let style;

    switch (phase) {
        case 'exit':
            style = {
                ...preset.exit,
                transition: `transform 200ms cubic-bezier(0.4, 0, 1, 1), opacity 200ms cubic-bezier(0.4, 0, 1, 1)`,
            };
            break;

        case 'enter':
            // Start from the "from" position, then immediately transition to "to"
            // We use a two-frame trick: render at "from", then on next frame go to "to"
            style = {
                ...preset.from,
                transition: 'none',
            };
            break;

        case 'idle':
        default:
            style = {
                ...preset.to,
                transition: `transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)`,
            };
            break;
    }

    return (
        <div className="product-display">
            <div className="product-display__wrapper">
                <div className="product-display__image-container" style={style}>
                    <img
                        src={fruit.image}
                        alt={fruit.name}
                        className="product-display__image"
                        draggable={false}
                    />
                </div>
            </div>

            {/* Tagline */}
            <div
                className="product-display__tagline"
                style={{
                    opacity: phase === 'idle' ? 1 : 0,
                    transform: phase === 'idle' ? 'translateY(0)' : 'translateY(16px)',
                    transition: phase === 'idle'
                        ? 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 100ms'
                        : 'opacity 150ms ease, transform 150ms ease',
                }}
            >
                <p className="product-display__tagline-text">{fruit.tagline}</p>
                <div className="product-display__tagline-line" />
            </div>
        </div>
    );
}
