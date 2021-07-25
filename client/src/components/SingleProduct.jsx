import { React, useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { CartContext } from './CartContext';

const SingleProduct = () => {

    const [product, setProduct] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const { cart, setCart } = useContext(CartContext);
    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        fetch(`/api/products/${params._id}`)
            .then(res => res.json())
            .then(product => {
                setProduct(product);
            })
    }, [params._id])

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
        <div className="container single__product">
            <button className="back" onClick={() => { history.goBack() }}>Back</button>

            <div style={{ display: "flex", gap: "5rem" }}>
                <img src={product.image} width="220px" height="220px" alt="" />

                <div>
                    <h1 className="product__title" style={{ fontSize: "3rem" }}>{product.name}</h1>
                    <span className="product__size">{product.size}</span>
                    <div className="product__price">₹ {product.price}</div>

                    <button onClick={(e) => { addToCart(e, product) }} disabled={isAdding} className={` add ${isAdding ? 'added' : 'none'} `} style={{ width: "-webkit-fill-available", padding: "0.5rem 0" }}>Add to cart</button>



                </div>
            </div>
        </div>
    )
}

export default SingleProduct;