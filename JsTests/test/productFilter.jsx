import React, { useState, useMemo } from "react";

function ProductSearch({ products = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />

      <table>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id} data-testid="product-row">
              <td data-testid="product-name">{product.name}</td>
              <td data-testid="product-price">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductSearch;

// Example of how to import and use the ProductSearch component in another React file
/* 
// App.jsx
import React from 'react';
import ProductSearch from './ProductSearch';

const sampleProducts = [
  { id: 1, name: 'Apple', price: '$1' },
  { id: 2, name: 'Banana', price: '$0.5' },
  { id: 3, name: 'Cherry', price: '$2' },
];

function App() {
  return (
    <div>
      <h1>Product Search</h1>
      <ProductSearch products={sampleProducts} />
    </div>
  );
}

export default App; 
*/
