import React from 'react';

export default function Background({ fruit }) {
    if (!fruit) return null;

    return (
        <div className="background">
            {/* 
         LAYER 0: CINEMATIC GLOW 
         Fixed radial backlight behind everything
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
         Stacked layout: Top (Faded) - Main (Sharp) - Bottom (Faded)
         User Step 1 & 6
      */}
            <div className="bg-fruit-stack">
                <div className="fruit-name-top" key={`top-${fruit.name}`}>
                    {fruit.name}
                </div>

                <div className="fruit-name-main" key={`main-${fruit.name}`}>
                    {fruit.name}
                </div>

                <div className="fruit-name-bottom" key={`bottom-${fruit.name}`}>
                    {fruit.name}
                </div>
            </div>
        </div>
    );
}
