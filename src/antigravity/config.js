/**
 * Antigravity – Cinematic Animation Config
 * Separate assets per object, staggered timeline per fruit.
 */

export const fruits = [
    {
        id: 'orange',
        name: 'ORANGE',
        gradient: 'linear-gradient(160deg, #FF6B00 0%, #FF8C00 30%, #FFA033 60%, #FF4500 100%)',
        bgColor: '#FF7A00',
        tagline: 'Pure Citrus Power in Every Sip',
        assets: {
            bottle: '/orange bottle.png',
            glass: '/orange glass.png',
            full: '/orange.png',
            half: '/orange half.png',
        },
    },
    {
        id: 'mango',
        name: 'MANGO',
        gradient: 'linear-gradient(160deg, #FFB347 0%, #FF8C00 30%, #E8A317 60%, #CC7722 100%)',
        bgColor: '#FFa040',
        tagline: 'Taste the King of Fruits',
        assets: {
            bottle: '/mangobottle.png',
            glass: '/mangoglass.png',
            full: '/mango.png',
            half: '/mangohalf.png',
        },
    },
    {
        id: 'pineapple',
        name: 'PINEAPPLE',
        gradient: 'linear-gradient(160deg, #A8C256 0%, #C5D34E 30%, #D4D94E 60%, #8DB600 100%)',
        bgColor: '#B8C84A',
        tagline: 'Tropical Freshness in Every Drop',
        assets: {
            bottle: '/pinapplebottle.png',
            glass: '/pinappleglass.png',
            full: '/pinapple.png',
            half: '/pinapplehalf.png',
        },
    },
    {
        id: 'watermelon',
        name: 'WATERMELON',
        gradient: 'linear-gradient(160deg, #E8474C 0%, #D43D51 30%, #C93545 60%, #B22234 100%)',
        bgColor: '#D94050',
        tagline: 'Cool the Summer Naturally',
        assets: {
            bottle: '/watermellonbottle.png',
            glass: '/water mellon glass.png',
            full: '/watermellon.png',
            half: '/watermellon half.png',
        },
    },
    {
        id: 'passion',
        name: 'PASSION FRUIT',
        gradient: 'linear-gradient(160deg, #6B3FA0 0%, #8B5FBF 30%, #A07ACC 60%, #C9A82C 100%)',
        bgColor: '#7B4FB0',
        tagline: 'Burst of Exotic Energy',
        assets: {
            bottle: '/passion bottle.png',
            glass: '/passion glass.png',
            full: '/passion.png',
            half: '/passion half.png',
        },
    },
];

/**
 * Staggered timeline delays (ms) for each object layer.
 * Updated to match user request: 900ms, 800ms, 700ms.
 */
export const timeline = {
    bottle: { delay: 0, duration: 900 },
    glass: { delay: 100, duration: 800 },
    full: { delay: 200, duration: 700 },
    half: { delay: 300, duration: 700 },
    splash: { delay: 200, duration: 800 },
    tagline: { delay: 600, duration: 500 },
};

/** Exit animation total duration */
export const exitDuration = 400;

/** Full cycle duration (exit + longest enter) */
export const cycleDuration = exitDuration + timeline.bottle.duration; // Approximate
