import { React, useContext, useEffect, useState } from "react";
import { CartContext } from './CartContext';

const Cart = () => {

  let total = 0;

  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const [priceFetched, togglePriceFetched] = useState(false);

  useEffect(() => {
    if (!cart.items) {
      return;
    }

    if (priceFetched) {
      return;
    }

    fetch("/api/products/cart-items", {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: Object.keys(cart.items) })
    }).then(res => res.json())
      .then(products => {
        setProducts(products);
        togglePriceFetched(true);
      })
  }, [cart, priceFetched])


  const getQuantity = (productId) => {
    return (cart.items[productId]);
  }

  const increament = (productId) => {
    const oldQty = cart.items[productId];
    const _cart = { ...cart };
    _cart.items[productId] = oldQty + 1;
    _cart.totalItem += 1;
    setCart(_cart);
  }

  const decreament = (productId) => {
    const oldQty = cart.items[productId];
    if (oldQty === 1) {
      return;
    }
    const _cart = { ...cart };
    _cart.items[productId] = oldQty - 1;
    _cart.totalItem -= 1;
    setCart(_cart);
  }

  const getSum = (productId, price) => {
    const sum = price * getQuantity(productId);
    total += sum;
    return sum;
  }

  const handleDelete = (productId) => {
    const _cart = { ...cart };
    const qty = _cart.items[productId];
    delete _cart.items[productId];
    _cart.totalItem -= qty;
    setCart(_cart);
    setProducts(products.filter((product) => product._id !== productId));
  }

  const handleOrderNow = () => {
    window.alert("Order Placed Succesfully!");
    setCart({});
    setProducts([]);
  }

  return (

    !products.length
      ? <img style={{
        position: 'absolute',
        left: '25%'
      }} src="/images/empty-cart.png" alt="empty-cart" />
      :
      <>
        <div className="cart__container">
          <h2 className="cart__title">Cart Items</h2>
          <ul className="grid" style={{ margin: '2rem 5rem' }}>
            {
              products.map(product => {
                return (
                  <li key={product._id}>
                    <div className="cart__item grid">
                      <div className="item__info">
                        <img width="60px" src={product.image} alt="" />
                        <h3>{product.name}</h3>
                      </div>
                      <div>
                        <button onClick={() => { decreament(product._id) }} className="quantity__btn">-</button>
                        <b className="quantity">{getQuantity(product._id)}</b>
                        <button onClick={() => { increament(product._id) }} className="quantity__btn">+</button>
                      </div>
                      <div>
                        <b>₹ {getSum(product._id, product.price)}</b>
                      </div>
                      <div>
                        <button onClick={() => { handleDelete(product._id) }} className="delete__btn">DELETE</button>
                      </div>
                    </div>
                  </li>
                );
              })
            }
            <hr />
            <div style={{ textAlign: 'end' }}>
              <h3>Grand Total : ₹ {total}</h3>
            </div>
            <div style={{ textAlign: 'end' }}>
              <button onClick={handleOrderNow} className="order__btn">ORDER NOW</button>
            </div>
          </ul>
        </div>
      </>
  );
};

export default Cart;