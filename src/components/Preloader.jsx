import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setComplete(true)
        });

        // 1. Logo Animation
        tl.to('.preloader__logo', {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
        });

        // 2. Text Reveal
        tl.to('.preloader__text', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5');

        // 3. Exit Animation (Curtain Up)
        tl.to('.preloader', {
            yPercent: -100,
            duration: 1.2,
            ease: 'power4.inOut',
            delay: 1.5
        });

        return () => tl.kill();
    }, []);

    if (complete) return null;

    return (
        <div className="preloader">
            <div className="preloader__content">
                <h1 className="preloader__logo">FRUITIFY</h1>
                <p className="preloader__text">Experience Freshness</p>
            </div>
        </div>
    );
}
