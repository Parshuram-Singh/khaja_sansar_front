import { useNavigate } from 'react-router-dom';
import useMenus from '../../hooks/useMenus.js';
import defaultImage from '../../assets/images/menus/default_menu.jpg';
import localStore from '../../utils/localStore.js';
import { useState, useEffect } from 'react';
import useUser from '../../hooks/useUser.js';

const MenuPage = () => {
  const navigate = useNavigate();
  const { menus, loading, error } = useMenus();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterFoodType, setFilterFoodType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const { user } = useUser();

  useEffect(() => {
    const storedProducts = localStore.get('selectedProducts');
    setSelectedProducts(storedProducts || []);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  const selectItems = (product, e) => {
    localStore.set('selectedProducts', product);
    setSelectedProducts(localStore.get('selectedProducts'));
    e.target.disabled = true;
    e.target.textContent = 'Added to Cart';
  };

  const handleRemoveSelection = () => {
    localStore.remove('selectedProducts');
    setSelectedProducts([]);
  };

  const processedToSubPage = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/subscriptions');
  };

  const sortMenusByPrice = (menus, ascending = true) => {
    const sorted = [...menus];
    for (let i = 0; i < sorted.length - 1; i++) {
      for (let j = 0; j < sorted.length - i - 1; j++) {
        if (
          (ascending && sorted[j].price > sorted[j + 1].price) ||
          (!ascending && sorted[j].price < sorted[j + 1].price)
        ) {
          [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
        }
      }
    }
    return sorted;
  };

  const filteredMenus = sortMenusByPrice(
    menus.filter((product) => {
      const matchesCategory = filterCategory === 'ALL' || product.category === filterCategory;
      const matchesFoodType = filterFoodType === 'ALL' || product.foodType === filterFoodType;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesFoodType && matchesSearch;
    }),
    sortOrder === 'asc'
  );

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header with Search */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Menu</h1>
        <p className="text-gray-600 mb-6">Discover delicious meals tailored to your taste</p>
        
        <div className="relative max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Section */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </h3>
            
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Dietary Preference</h4>
                <div className="space-y-2">
                  {['ALL', 'veg', 'non-veg'].map((type) => (
                    <button
                      key={type}
                      className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        filterFoodType === type
                          ? type === 'veg' 
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : type === 'non-veg'
                            ? 'bg-red-50 text-red-800 border border-red-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => setFilterFoodType(type)}
                    >
                      {type === 'ALL' ? (
                        <>
                          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                          All Types
                        </>
                      ) : type === 'veg' ? (
                        <>
                          <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                          Vegetarian
                        </>
                      ) : (
                        <>
                          <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                          Non-Vegetarian
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Meal Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['ALL', 'BREAKFAST', 'LUNCH', 'DINNER'].map((category) => (
                    <button
                      key={category}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        filterCategory === category
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => setFilterCategory(category)}
                    >
                      {category === 'ALL' ? 'All' : category.charAt(0) + category.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">Sort By</h4>
                <div className="space-y-2">
                  {[
                    { value: 'asc', label: 'Price: Low to High' },
                    { value: 'desc', label: 'Price: High to Low' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        sortOrder === option.value
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                      onClick={() => setSortOrder(option.value)}
                    >
                      <span>{option.label}</span>
                      {sortOrder === option.value && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Your Order
            </h3>

            {selectedProducts.length > 0 ? (
              <div className="space-y-4">
                <div className="max-h-64 overflow-y-auto pr-2 -mr-2">
                  <ul className="space-y-3 divide-y divide-gray-100">
                    {selectedProducts.map((product) => (
                      <li key={product._id} className="flex justify-between items-start pt-3 first:pt-0">
                        <div className="flex items-start">
                          <div className="ml-3">
                            <span className="text-sm font-medium text-gray-900">{product.name}</span>
                            <span className="block text-xs text-gray-500">{product.category.toLowerCase()}</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Rs {product.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>Rs {selectedProducts.reduce((sum, p) => sum + p.price, 0).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={handleRemoveSelection}
                    className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h4 className="mt-2 text-sm font-medium text-gray-900">No items added</h4>
                <p className="mt-1 text-sm text-gray-500">Start adding items to your cart</p>
              </div>
            )}
          </div>
        </aside>

        {/* Product Grid */}
        <section className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredMenus.length} {filteredMenus.length === 1 ? 'Item' : 'Items'} Available
            </h2>
            <div className="flex items-center text-sm text-gray-500">
              <span>Showing all results</span>
            </div>
          </div>

          {filteredMenus.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenus.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200"
                >
                  <div className="relative pb-3/4 h-48">
                    <img
                      src={product.image || defaultImage}
                      alt={product.name}
                      className="absolute h-full w-full object-cover"
                    />
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-medium bg-red-500 px-2 py-1 rounded">Currently Unavailable</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        product.foodType === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.foodType === 'veg' ? 'Veg' : 'Non-Veg'}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Rs {product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => selectItems(product, e)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedProducts.some((p) => p._id === product._id) || !product.isAvailable
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={selectedProducts.some((p) => p._id === product._id) || !product.isAvailable}
                      >
                        {selectedProducts.some((p) => p._id === product._id) ? (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Added
                          </span>
                        ) : (
                          'Add to Cart'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setFilterCategory('ALL');
                  setFilterFoodType('ALL');
                  setSearchQuery('');
                }}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset all filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Sticky Proceed Button - Only shows when items are in cart */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={processedToSubPage}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-blue-800"
          >
            Proceed to Subscription
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
};

export default MenuPage;