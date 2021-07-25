
import { React, useState, useEffect } from 'react'
import Product from './Product'

const Product_home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(response => response.json())
            .then(products => {
                setProducts(products);
            })
    }, []);

    return (
        <>
            <div className="product__title">
                <h2>Products</h2>
            </div>
            <div className="product__list">
                <ul className="product__items grid">

                    {
                        products.map(product => <Product key={product._id} product={product} />)
                    }


                </ul>
            </div>


        </>
    );
}

export default Product_home;