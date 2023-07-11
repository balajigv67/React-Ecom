import React from "react";

const SearchResults = ({ products }) => {
  return (
    <div className="search-results">
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
