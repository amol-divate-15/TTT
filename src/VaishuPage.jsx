import React, { useState } from 'react';
import './VaishuPage.css';

import v1 from './assets/v1.jpeg';
import v2 from './assets/v2.jpeg';
import v3 from './assets/v3.jpeg';
import v4 from './assets/v4.jpeg';
import v5 from './assets/v5.jpeg';
import v6 from './assets/v6.jpeg';
import v7 from './assets/v7.jpeg';

// 7 Local Photos
const photos = [v1, v2, v3, v4, v5, v6, v7];

const VaishuPage = () => {
    const [showCarousel, setShowCarousel] = useState(false);

    // Radius of the carousel circle. 
    // ~400px looks good for desktop, will scale down with media queries via CSS transform if needed
    // But hardcoding radius in translateZ needs care.
    // For 10 items width 200px (approx), radius ~ 340px.
    // We'll use a dynamic radius style check or just a safe fixed one.
    const radius = 340;
    // For mobile, we might need to reduce this. Let's handle it with a simple media query check or CSS variable.
    // Actually, let's use a CSS variable for radius if possible, or just a conservative value.
    // 340px radius on a 320px wide phone screen might clip.
    // We'll trust the 3D transform to handle depth, but the user might need to zoom out.
    // We'll add a 'scale' transform to the carousel container on mobile in CSS.

    const handleButtonClick = () => {
        setShowCarousel(true);
    };

    const handleClose = () => {
        setShowCarousel(false);
    };

    const renderHearts = () => {
        const hearts = [];
        for (let i = 0; i < 20; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 2 + 1}rem`
            };
            hearts.push(<div key={i} className="heart" style={style}>❤️</div>);
        }
        return hearts;
    };

    // Calculate angle per item dynamically
    const anglePerItem = 360 / photos.length;

    return (
        <div className="vaishu-container">
            <div className="bg-hearts">
                {renderHearts()}
            </div>

            {!showCarousel && (
                <button className="magic-button" onClick={handleButtonClick}>
                    Click Vaishu Here
                </button>
            )}

            {showCarousel && (
                <div className={`carousel-scene ${showCarousel ? 'visible' : ''}`}>
                    <h1 className="valentine-title">Happy Valentine's Day Bestie! 💖</h1>

                    <div className="carousel">
                        {photos.map((src, index) => (
                            <div
                                className="carousel-item"
                                key={index}
                                style={{
                                    transform: `rotateY(${index * anglePerItem}deg) translateZ(${radius}px)`
                                }}
                            >
                                <img src={src} alt={`Vaishu ${index}`} className="carousel-img" />
                            </div>
                        ))}
                    </div>

                    <button className="close-btn" onClick={handleClose}>×</button>
                </div>
            )}
        </div>
    );
};

export default VaishuPage;
