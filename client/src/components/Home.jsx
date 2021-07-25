import React from "react";
import { Link } from "react-router-dom";
import Products from './Product_home'

const Home = () => {
  return (
    <>
      <div className="home container grid">
        <div className="home__content grid">
          <div className="home__data">
            <h2 className="home__subtitle"><em>Are you hungry?</em></h2>
            <h1 style={{ marginBottom: '0.5rem' }}>Don't Wait</h1>
            <Link to="/product" className="home__button">Order Now</Link>
          </div>
          <div className="home__img">
            <img style={{ width: "100%" }}
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80"
              alt="fgdfg" />
          </div>
        </div>
      </div>

      <div className="products container grid">
        <Products />
      </div>
    </>
  );

};

export default Home;