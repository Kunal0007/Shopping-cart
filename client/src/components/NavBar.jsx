import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from './CartContext'

const Navbar = () => {

  const { cart } = useContext(CartContext);

  return (
    <>
      <header className="header" id="header">
        <div className="nav container">
          <Link to="/" className="nav__logo">SHOP</Link>

          <div className="nav__menu">
            <ul className="nav__list grid">
              <li className="nav__item">
                <Link to="/" className="nav__link">Home</Link>
              </li>
              <li className="nav__item">
                <Link to="/product" className="nav__link">Product</Link>
              </li>
              <li className="nav__item">
                <Link to="/cart">
                  <div className="nav__link cart">
                    <span>{cart.totalItem ? cart.totalItem : 0}</span>
                    <img src="/images/cart.png" style={{ width: '1.2rem', marginLeft: '0.3rem', verticalAlign: 'bottom' }} alt="cart-icon" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </header>
    </>

  );
};

export default Navbar;