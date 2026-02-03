import { useState, useEffect } from 'react';
import './VaishuPage.css';

import v1 from './assets/v1.jpeg';
import v2 from './assets/v2.jpeg';
import v3 from './assets/v3.jpeg';
import v4 from './assets/v4.jpeg';
import v5 from './assets/v5.jpeg';
import v6 from './assets/v6.jpeg';
import v7 from './assets/v7.jpeg';

const photos = [v1, v2, v3, v4, v5, v6, v7];

const VaishuPage = () => {
  const [stage, setStage] = useState('idle');
  const [radius, setRadius] = useState(340);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setRadius(150);
      } else if (window.innerWidth < 768) {
        setRadius(210);
      } else {
        setRadius(340);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonClick = () => {
    setStage('box-appear');

    setTimeout(() => {
      setStage('box-opening');
      setTimeout(() => {
        setStage('carousel');
      }, 1000);
    }, 1500);
  };

  const handleClose = () => {
    setStage('idle');
  };

  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 26; i++) {
      const size = Math.random() * 10 + 6;
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${12 + Math.random() * 14}s`,
        opacity: (Math.random() * 0.5 + 0.15).toFixed(2)
      };
      particles.push(<span key={i} className="particle" style={style} />);
    }
    return particles;
  };

  const anglePerItem = 360 / photos.length;

  return (
    <div className="vaishu-root">
      <div className="ambient">{renderParticles()}</div>

      <header className="site-header">
        <div className="logo">Vaishu</div>
        <div className="pill">Memory Capsule</div>
      </header>

      <main className="content">
        <section className="hero">
          <p className="eyebrow">Hello Ji</p>
          <h1>Moments in Motion</h1>
          <p className="lead">
            A small gallery of snapshots and experiments. Tap the capsule to
            reveal the 3D reel.
          </p>
          {stage === 'idle' && (
            <button className="primary-cta" onClick={handleButtonClick}>
              Click here vaishu
            </button>
          )}
          <p className="helper">Hover the reel to pause the spin.</p>
        </section>

        <section className="stage">
          {stage === 'idle' && (
            <div className="idle-card">
              <div className="idle-label">Preview deck</div>
              <div className="idle-sub">Waiting for the reveal</div>
            </div>
          )}

          {stage !== 'idle' && (
            <div className="scene-container">
              {stage !== 'carousel' && (
                <div
                  className={`gift-box ${stage === 'box-opening' ? 'opening' : ''}`}
                >
                  <div className="box-face face-front"></div>
                  <div className="box-face face-back"></div>
                  <div className="box-face face-right"></div>
                  <div className="box-face face-left"></div>
                  <div className="box-face face-bottom"></div>

                  <div className={`box-lid ${stage === 'box-opening' ? 'open' : ''}`}>
                    <div className="lid-top"></div>
                    <div className="lid-side ls-front"></div>
                    <div className="lid-side ls-back"></div>
                    <div className="lid-side ls-left"></div>
                    <div className="lid-side ls-right"></div>
                  </div>
                </div>
              )}

              <div
                className="carousel-container"
                style={{
                  opacity: stage === 'carousel' ? 1 : 0,
                  pointerEvents: stage === 'carousel' ? 'auto' : 'none',
                  transition: 'opacity 1s ease'
                }}
              >
                {stage === 'carousel' && (
                  <>
                    <h2 className="reveal-title">Vault Open</h2>
                    <div className="carousel">
                      {photos.map((src, index) => (
                        <div
                          className="carousel-item"
                          key={index}
                          style={{
                            transform: `rotateY(${index * anglePerItem}deg) translateZ(${radius}px)`,
                            opacity: 1
                          }}
                        >
                          <img
                            src={src}
                            alt={`Shot ${index + 1}`}
                            className="carousel-img"
                          />
                        </div>
                      ))}
                    </div>
                    <button className="close-btn" onClick={handleClose}>
                      Close
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="site-footer">
        Crafted with care. Tap again to reset.
      </footer>
    </div>
  );
};

export default VaishuPage;
