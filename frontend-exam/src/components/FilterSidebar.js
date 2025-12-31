import React from 'react';
import { Filter, DollarSign, ArrowUpDown } from 'lucide-react';

const FilterSidebar = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceRangeChange, sortBy, onSortChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-20">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <label
              key={category}
              className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700 font-medium">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-primary-600" />
          <h4 className="text-sm font-semibold text-gray-700">Price Range</h4>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
          <span className="text-gray-500 text-sm">to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ArrowUpDown className="w-4 h-4 text-primary-600" />
          <h4 className="text-sm font-semibold text-gray-700">Sort By</h4>
        </div>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;