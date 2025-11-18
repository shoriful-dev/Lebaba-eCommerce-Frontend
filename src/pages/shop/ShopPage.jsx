import React, { useState } from 'react';
import ProductCards from './ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
  categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
  colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
  priceRanges: [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 and above', min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fillterState, setFillterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: '',
  });
  const { category, color, priceRange } = fillterState;
  const [minPrice, maxPrice] = priceRange.split('-').map(Number);
  const [productPerPage] = useState(8);
  const {
    data: productsData = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productPerPage,
  });
  if (isLoading) return <p>Loading...</p>;
  const { products, totalPages, totalProducts } = productsData?.data || {};
  const handlePageChange = pageNumber => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const startProduct = (currentPage - 1) * productPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  return (
    <>
      <section className="section__container rounded bg-primary-light">
        <h2 className="section__header">Shop Page</h2>
        <p className="section__subheader">
          Discover the Hottest Picks: Elevate Your Style with our Created
          Collection of Trending Women's Fashion Products.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* categories */}
          <div className="">categories</div>

          {/* products card */}
          <div className="">
            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} Products
            </h3>
            <ProductCards products={products} />

            {/* pagination */}
            <div className="mt-6 flex justify-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? 'bg-blue-500 text-white rounded'
                      : 'bg-gray-200 text-gray-700 rounded'
                  }`}
                  key={index}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
