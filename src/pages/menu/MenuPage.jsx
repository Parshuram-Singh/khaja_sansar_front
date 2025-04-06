import { useNavigate } from 'react-router-dom';
import useMenus from "../../hooks/useMenus.js"; 
import './MenuPage.css';  // import the CSS file
import defaultImage from '../../assets/images/menus/default_menu.jpg'; 


const MenuPage = () => {
  const navigate = useNavigate();
  const { menus, loading, error } = useMenus();

  const handleSelectProduct = (product) => {
    navigate('/subscriptions', { state: { selectedProduct: product } });
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <main className="menu-main">
      <section className="menu-section">
        <div className="menu-container">
          <h2 className="menu-heading">Our Products</h2>
          <div className="product-grid">
            {menus.map((product) => (
              <div key={product._id} className="product-card">
                <img 
                  src={product.image ? product.image : defaultImage} 
                  alt={product.name} 
                  className="product-image" 
                />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">{product.price} NPR</p>
                  <button
                    onClick={() => handleSelectProduct(product)}
                    className="select-button"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MenuPage;
