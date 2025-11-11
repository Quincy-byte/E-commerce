import React from 'react';
import './Home.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

const Home = () => {
  return (
    <div className="home">
      <div className="home-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-hand-icon">
          <p>new</p>
          <img src={hand_icon} alt="hand" />
        </div>
        <p>collections</p>
        <p>for everyone</p>

        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};



export default Home;
