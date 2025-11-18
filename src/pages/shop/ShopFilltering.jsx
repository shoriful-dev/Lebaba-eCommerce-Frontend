import React from 'react';

const ShopFilltering = ({
  fillters,
  fillterState,
  setFillterState,
  clearFillters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {fillters.categories.map(category => (
          <label key={category} className='capitalize cursor-pointer'>
            <input
              type="radio"
              name="category"
              value={category}
              checked={fillterState.category === category}
              onChange={(e) => setFillterState({...fillterState, category: e.target.value})}
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Colors</h4>
        <hr />
        {fillters.colors.map(color => (
          <label key={color} className='capitalize cursor-pointer'>
            <input
              type="radio"
              name="color"
              value={color}
              checked={fillterState.color === color}
              onChange={(e) => setFillterState({...fillterState, color: e.target.value})}
            />
            <span className="ml-1">{color}</span>
          </label>
        ))}
      </div>
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {fillters.priceRanges.map(range => (
          <label key={range} className='capitalize cursor-pointer'>
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={fillterState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) => setFillterState({...fillterState, priceRange: e.target.value})}
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>

      {/* clear filtering */}
      <button onClick={clearFillters} className='bg-primary py-1 px-4 text-white rounded hover:bg-primary-dark'>Clear All Filters</button>
    </div>
  );
};

export default ShopFilltering;
