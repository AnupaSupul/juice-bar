/**
 * Background – Fixed fullscreen gradient + large parallax fruit name.
 */
export default function Background({ fruit, phase }) {
    const isAnimating = phase !== 'idle';

    return (
        <div className="background">
            {/* Gradient */}
            <div
                className="background__gradient"
                style={{ background: fruit.gradient }}
            />

            {/* Center ambient glow */}
            <div
                className="background__glow"
                style={{
                    background: `radial-gradient(ellipse at 50% 55%, ${fruit.bgColor}44 0%, transparent 60%)`,
                }}
            />

            {/* Large fruit name */}
            <div className="background__text-container">
                <h1
                    className="background__fruit-name"
                    style={{
                        opacity: isAnimating ? 0 : 0.06,
                        filter: isAnimating ? 'blur(30px)' : 'blur(0px)',
                        transform: isAnimating ? 'scale(0.9) translateY(15px)' : 'scale(1) translateY(0)',
                    }}
                >
                    {fruit.name}
                </h1>
            </div>
        </div>
    );
}
