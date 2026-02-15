import React from 'react';

export default function Background({ fruit }) {
    if (!fruit) return null;

    return (
        <div className="background">
            {/* 
         LAYER 0: CINEMATIC GLOW 
      */}
            <div className="bg-glow" />

            {/* 
         LAYER 0.5: COLOR GRADIENT 
      */}
            <div
                className="background__gradient"
                style={{ background: fruit.gradient }}
            />

            {/* 
         LAYER 1: FRUIT NAME STACK
         User Step 3: Premium Animations via key-changing
      */}
            <div className="bg-fruit-stack">
                {/* Top Copy */}
                <div
                    className="fruit-text-item fruit-name-top"
                    key={`top-${fruit.name}`}
                >
                    {fruit.name}
                </div>

                {/* Main Center */}
                <div
                    className="fruit-text-item fruit-name-main"
                    key={`main-${fruit.name}`}
                >
                    {fruit.name}
                </div>

                {/* Bottom Copy */}
                <div
                    className="fruit-text-item fruit-name-bottom"
                    key={`bottom-${fruit.name}`}
                >
                    {fruit.name}
                </div>
            </div>
        </div>
    );
}
