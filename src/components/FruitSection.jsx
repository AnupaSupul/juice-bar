import React from 'react';

/**
 * FruitSection – A 100vh scroll sentinel div.
 * It exists purely to be observed by IntersectionObserver.
 * No visual content — the fixed ProductDisplay handles visuals.
 */
const FruitSection = React.forwardRef(({ index, isFirst }, ref) => {
    return (
        <div ref={ref} className="fruit-section" data-index={index}>
            {isFirst && (
                <div className="scroll-indicator">
                    <span className="scroll-indicator__text">Scroll to explore</span>
                    <div className="scroll-indicator__line" />
                </div>
            )}
        </div>
    );
});

FruitSection.displayName = 'FruitSection';
export default FruitSection;
