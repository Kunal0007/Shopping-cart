import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import ProductsPage from "./ProductsPage";
import SingleProduct from './SingleProduct'
import Navbar from "./NavBar";
import Cart from "./Cart";
import { CartContext } from './CartContext';
import { getCart, storeCart } from './helper';

const App = () => {

  const [cart, setCart] = useState({});

  useEffect(() => {
    getCart().then(cart => {
      setCart(JSON.parse(cart));
    });
  }, [])

  useEffect(() => {
    storeCart(cart);
  }, [cart])

  return (
    <div>
      <Router>
        <CartContext.Provider value={{ cart, setCart }}>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/product" component={ProductsPage} exact></Route>
            <Route path="/product/:_id" component={SingleProduct}></Route>
            <Route path="/cart" component={Cart}></Route>
          </Switch>
        </CartContext.Provider>
      </Router>
    </div>
  );
};

export default App;
