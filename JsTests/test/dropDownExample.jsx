import React from "react";

function CategorySelect({ categories = [], onSelectCategory, selectedValue }) {
  return (
    <div className="form-group">
      <label htmlFor="category-select">Selecione uma Categoria:</label>
      <select
        id="category-select"
        value={selectedValue}
        onChange={(e) => onSelectCategory(e.target.value)}
        data-testid="category-dropdown"
      >
        <option value="">-- Selecione --</option>
        {categories.map((category) => (
          <option
            key={category.code}
            value={category.code}
            data-testid="category-option"
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategorySelect;

// Example of how to import and use the CategorySelect component in another React file
/* 
// App.jsx
import React, { useState } from 'react';
import CategorySelect from './CategorySelect';

const categories = [
  { code: 'tech', name: 'Technology' },
  { code: 'health', name: 'Health' },
  { code: 'sports', name: 'Sports' },
];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (categoryCode) => {
    setSelectedCategory(categoryCode);
    console.log('Selected Category:', categoryCode);
  };

  return (
    <div>
      <h1>Select a Category</h1>
      <CategorySelect
        categories={categories}
        onSelectCategory={handleSelectCategory}
        selectedValue={selectedCategory}
      />
      <p>Selected Category Code: {selectedCategory}</p>
    </div>
  );
}

export default App; 
*/
