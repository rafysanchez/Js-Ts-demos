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
