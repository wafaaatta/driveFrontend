import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('default');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/v1/products/')
            .then(response => {
                let sortedProducts = response.data;

                if (sortCriteria === 'priceHighest') {
                    sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
                } else if (sortCriteria === 'priceLowest') {
                    sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
                } else if (sortCriteria === 'newestProduct') {
                    sortedProducts = sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                } else if (sortCriteria === 'oldestProduct') {
                    sortedProducts = sortedProducts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                }

                setProducts(sortedProducts);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, [sortCriteria]);

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const AppUrl = 'http://127.0.0.1:8000/storage/';

    return (
        <div>
            <select onChange={handleSortChange}>
                <option value="default">Sort by Default</option>
                <option value="priceHighest">Sort by Price: Highest to Lowest</option>
                <option value="priceLowest">Sort by Price: Lowest to Highest</option>
                <option value="newestProduct">Sort by Newest Products</option>
                <option value="oldestProduct">Sort by Oldest Products</option>
            </select>

            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <img src={AppUrl + product.image} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                        <p>Stock: {product.stock}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;

