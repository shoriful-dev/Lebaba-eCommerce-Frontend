import React from 'react';
import { Link } from 'react-router-dom';
import cart1 from '../../assets/card-1.png';
import cart2 from '../../assets/card-2.png';
import cart3 from '../../assets/card-3.png';

const Trends = () => {
  return (
    <section className="section__container hero__container">
      <div className="hero__card">
        <img src={cart1} alt="Womens Shirt" />
        <div className="hero__content">
          <p>2023 Trend</p>
          <h4>Womens Shirt</h4>
          <Link to="#">Discover More +</Link>
        </div>
      </div>
      <div className="hero__card">
        <img src={cart2} alt="Womens Dresses" />
        <div className="hero__content">
          <p>2023 Trend</p>
          <h4>Womens Dresses</h4>
          <Link to="#">Discover More +</Link>
        </div>
      </div>
      <div className="hero__card">
        <img src={cart3} alt="Womens Casuals" />
        <div className="hero__content">
          <p>2023 Trend</p>
          <h4>Womens Casuals</h4>
          <Link href="#">Discover More +</Link>
        </div>
      </div>
    </section>
  );
};

export default Trends;
