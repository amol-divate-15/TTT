
import React, { useState, useEffect } from 'react';
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
    // Stages: 'idle' | 'box-appear' | 'box-opening' | 'carousel'
    const [stage, setStage] = useState('idle');
    const [radius, setRadius] = useState(340);

    // Calculate dynamic radius
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 480) {
                setRadius(150); // Very small screens
            } else if (window.innerWidth < 768) {
                setRadius(210); // Tablets / Large phones
            } else {
                setRadius(340); // Desktop
            }
        };

        handleResize(); // Set initial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleButtonClick = () => {
        setStage('box-appear');
        // Sequence the animations
        setTimeout(() => {
            setStage('box-opening');
            setTimeout(() => {
                setStage('carousel');
            }, 1000); // Wait for open animation
        }, 1500); // Wait for box to appear
    };

    const handleClose = () => {
        setStage('idle');
    };

    const renderHearts = () => {
        const hearts = [];
        for (let i = 0; i < 30; i++) {
            const style = {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 2 + 0.5}rem`
            };
            hearts.push(<div key={i} className="heart" style={style}>❤️</div>);
        }
        return hearts;
    };

    const anglePerItem = 360 / photos.length;

    return (
        <div className="vaishu-container">
            <div className="bg-hearts">
                {renderHearts()}
            </div>

            {/* Stage 1: Button */}
            {stage === 'idle' && (
                <button className="magic-button" onClick={handleButtonClick}>
                    Click Here Vaishu 🎁
                </button>
            )}

            {/* Stage 2 & 3: Gift Box Scene */}
            {stage !== 'idle' && (
                <div className="scene-container">

                    {/* The Gift Box */}
                    {stage !== 'carousel' && (
                        <div className={`gift-box ${stage === 'box-opening' ? 'opening' : ''}`}>
                            <div className="box-face face-front"></div>
                            <div className="box-face face-back"></div>
                            <div className="box-face face-right"></div>
                            <div className="box-face face-left"></div>
                            <div className="box-face face-bottom"></div>

                            {/* Lid */}
                            <div className={`box-lid ${stage === 'box-opening' ? 'open' : ''}`}>
                                <div className="lid-top"></div>
                                <div className="lid-side ls-front"></div>
                                <div className="lid-side ls-back"></div>
                                <div className="lid-side ls-left"></div>
                                <div className="lid-side ls-right"></div>
                            </div>
                        </div>
                    )}

                    {/* Stage 4: Carousel (Images start inside box then fly out) */}
                    <div className="carousel-container" style={{
                        opacity: stage === 'carousel' ? 1 : 0,
                        pointerEvents: stage === 'carousel' ? 'auto' : 'none',
                        transition: 'opacity 1s ease'
                    }}>
                        {stage === 'carousel' && (
                            <>
                                <h1 className="valentine-title">MISS YOU 💖</h1>
                                <div className="carousel">
                                    {photos.map((src, index) => (
                                        <div
                                            className="carousel-item"
                                            key={index}
                                            style={{
                                                // When 'carousel' stage is active, apply the transform.
                                                // Before that (implicitly), they are at 0,0,0 (inside box).
                                                // We use a CSS transition to animate smoothly to this position.
                                                transform: `rotateY(${index * anglePerItem}deg) translateZ(${radius}px)`,
                                                opacity: 1
                                            }}
                                        >
                                            <img src={src} alt={`Vaishu ${index}`} className="carousel-img" />
                                        </div>
                                    ))}
                                </div>
                                <button className="close-btn" onClick={handleClose}>×</button>
                            </>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default VaishuPage;
