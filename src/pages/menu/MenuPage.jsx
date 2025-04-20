import { useNavigate } from 'react-router-dom';
import useMenus from "../../hooks/useMenus.js"; 
import './MenuPage.css'; 
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
  const { user } = useUser();

  useEffect(() => {
    const storedProducts = localStore.get('selectedProducts');
    setSelectedProducts(storedProducts || []);
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  const selectItems = (product, e) => {
    localStore.set('selectedProducts', product);
    setSelectedProducts(localStore.get('selectedProducts'));
    e.target.disabled = true;
    e.target.textContent = "Added to Cart";
  };

  const handleRemoveSelection = () => {
    localStore.remove('selectedProducts');
    setSelectedProducts([]);
  };

  const processedToSubPage = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/subscriptions");
  };

  // Filter and search logic
  const filteredMenus = menus.filter((product) => {
    const matchesCategory = filterCategory === 'ALL' || product.category === filterCategory;
    const matchesFoodType = filterFoodType === 'ALL' || product.foodType === filterFoodType;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesFoodType && matchesSearch;
  });

  return (
    <main className="menu-main">
      <div className="menu-layout">
        {/* Left: Filter Section */}
        <aside className="menu-sidebar left">
          <h3 className="filter-heading">Filters</h3>
          <div className="filter-group">
            <label className="filter-label">Dietary Preference</label>
            <div className="filter-buttons">
              <button
                className={`filter-button ${filterFoodType === 'ALL' ? 'active' : ''}`}
                onClick={() => setFilterFoodType('ALL')}
              >
                All
              </button>
              <button
                className={`filter-button ${filterFoodType === 'veg' ? 'active veg' : ''}`}
                onClick={() => setFilterFoodType('veg')}
              >
                Veg
              </button>
              <button
                className={`filter-button ${filterFoodType === 'non-veg' ? 'active non-veg' : ''}`}
                onClick={() => setFilterFoodType('non-veg')}
              >
                Non-Veg
              </button>
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-buttons">
              <button
                className={`filter-button ${filterCategory === 'ALL' ? 'active' : ''}`}
                onClick={() => setFilterCategory('ALL')}
              >
                All
              </button>
              <button
                className={`filter-button ${filterCategory === 'BREAKFAST' ? 'active' : ''}`}
                onClick={() => setFilterCategory('BREAKFAST')}
              >
                Breakfast
              </button>
              <button
                className={`filter-button ${filterCategory === 'LUNCH' ? 'active' : ''}`}
                onClick={() => setFilterCategory('LUNCH')}
              >
                Lunch
              </button>
              <button
                className={`filter-button ${filterCategory === 'DINNER' ? 'active' : ''}`}
                onClick={() => setFilterCategory('DINNER')}
              >
                Dinner
              </button>
            </div>
          </div>
        </aside>

        {/* Center: Product Grid */}
        <section className="menu-content">
          <h2 className="menu-heading">Our Products</h2>
          <div className="product-grid">
            {filteredMenus.length > 0 ? (
              filteredMenus.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image ? product.image : defaultImage}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-tags">
                    <span className={`tag ${product.foodType === 'veg' ? 'veg' : 'non-veg'}`}>
                      {product.foodType === 'veg' ? 'Veg' : 'Non-Veg'}
                    </span>
                    <span className="tag category">{product.category}</span>
                    {!product.isAvailable && <span className="tag unavailable">Unavailable</span>}
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">${product.price}</p>
                    <button
                      onClick={(e) => selectItems(product, e)}
                      className="select-button"
                      disabled={selectedProducts.some((p) => p._id === product._id) || !product.isAvailable}
                    >
                      {selectedProducts.some((p) => p._id === product._id) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No items match your filters or search.</p>
            )}
          </div>
          <div className="subscription-button-container">
            <button onClick={processedToSubPage} className="subscription-button">
              Proceed to Subscription
            </button>
          </div>
        </section>

        {/* Right: Search and Selection */}
        <aside className="menu-sidebar right">
          <h3 className="selection-heading">Your Selection</h3>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          {selectedProducts.length > 0 ? (
            <div className="selected-products">
              <ul className="selected-products-list">
                {selectedProducts.map((product) => (
                  <li key={product._id} className="selected-product-item">
                    {product.name} - ${product.price}
                  </li>
                ))}
              </ul>
              <button className="remove-button" onClick={handleRemoveSelection}>
                Remove All
              </button>
            </div>
          ) : (
            <p className="no-selection">No items selected.</p>
          )}
        </aside>
      </div>
    </main>
  );
};

export default MenuPage;