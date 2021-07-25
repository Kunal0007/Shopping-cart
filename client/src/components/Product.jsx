import { React, useContext, useState } from 'react'
import { Link } from "react-router-dom";
import { CartContext } from './CartContext';

const Product = (props) => {
    const [isAdding, setIsAdding] = useState(false);

    const { cart, setCart } = useContext(CartContext);

    const { product } = props;

    const addToCart = (event, product) => {

        let _cart = { ...cart };

        if (!_cart.items) {
            _cart.items = {};
        }

        if (_cart.items[product._id]) {
            _cart.items[product._id] += 1;
        } else {
            _cart.items[product._id] = 1;
        }

        if (!_cart.totalItem) {
            _cart.totalItem = 0;
        }

        _cart.totalItem += 1;

        setCart(_cart);

        setIsAdding(true);

        setInterval(() => {
            setIsAdding(false);
        }, 800);
    }

    return (
        <div>
            <li className="product__item">
                <Link to={`/product/${product._id}`}>
                    <div className="product__img grid">
                        <img src={product.image} width="220px" height="220px" alt="" />
                    </div>
                </Link>
                <div style={{ textAlign: 'center' }}>
                    <h3 className="product__title">{product.name}</h3>
                    <span className="product__size">{product.size}</span>
                </div>

                <div className="product__info">
                    <span>₹ {product.price}</span>
                    <button disabled={isAdding} className={` add ${isAdding ? 'added' : 'none'} `} onClick={(e) => { addToCart(e, product) }}>
                        ADD{isAdding ? 'ED' : ''}
                    </button>
                </div>
            </li>
        </div>
    )
}

export default Product
