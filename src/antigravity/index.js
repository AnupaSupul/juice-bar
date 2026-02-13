/**
 * Antigravity Animation System – Cinematic Engine
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { exitDuration, timeline } from './config';

/**
 * useActiveSection – IntersectionObserver-based scroll sentinel.
 */
export function useActiveSection(count) {
    const [activeIndex, setActiveIndex] = useState(0);
    const refs = useRef([]);

    const setRef = useCallback(
        (index) => (el) => {
            refs.current[index] = el;
        },
        []
    );

    useEffect(() => {
        const observers = [];

        refs.current.forEach((el, i) => {
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveIndex(i);
                },
                { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [count]);

    return { activeIndex, setRef };
}

/**
 * useCinematicTransition – Manages exit → swap → staggered enter lifecycle.
 *
 * phase: 'idle' | 'exit' | 'enter'
 * displayIndex: which fruit's assets to show
 * enterProgress: 0-1 how far into the enter phase (for stagger)
 */
export function useCinematicTransition(activeIndex) {
    const [state, setState] = useState({
        displayIndex: activeIndex,
        phase: 'idle',
    });

    const prevRef = useRef(activeIndex);
    const timeoutsRef = useRef([]);

    const clearTimeouts = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
    }, []);

    useEffect(() => {
        if (activeIndex === prevRef.current) return;
        clearTimeouts();

        // Phase 1: Exit
        setState({ displayIndex: prevRef.current, phase: 'exit' });

        // Phase 2: Swap and Enter
        const t1 = setTimeout(() => {
            setState({ displayIndex: activeIndex, phase: 'enter' });
        }, exitDuration);

        // Phase 3: Settle to idle after all staggered animations complete
        const longestEnter = timeline.tagline.delay + timeline.tagline.duration;
        const t2 = setTimeout(() => {
            setState({ displayIndex: activeIndex, phase: 'idle' });
        }, exitDuration + longestEnter);

        timeoutsRef.current = [t1, t2];
        prevRef.current = activeIndex;

        return clearTimeouts;
    }, [activeIndex, clearTimeouts]);

    return state;
}
