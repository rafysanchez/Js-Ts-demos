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
