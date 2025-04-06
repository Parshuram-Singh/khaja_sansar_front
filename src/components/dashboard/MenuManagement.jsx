import { useState } from 'react';
import useMenus from '../../hooks/useMenus.js';
import { FaHamburger, FaDollarSign, FaRegListAlt, FaTrash, FaImage } from 'react-icons/fa';
import "./stylesheets/MenuManagement.css";

function MenuManagement() {
  const [menuData, setMenuData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const {
    createNewMenu,
    deleteMenuItem,
    menus,
    createLoading,
    deleteLoading,
    fetchLoading,
    createError,
    deleteError,
    createdMenu,
    fetchError,
  } = useMenus();

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', menuData.name);
    formData.append('price', menuData.price);
    formData.append('description', menuData.description);
    if (menuData.image) {
      formData.append('image', menuData.image);
    }

    await createNewMenu(formData);

    if (!createError) {
      setMenuData({ name: '', price: '', description: '', image: null });
    }
  };

  const handleDelete = async (menuId) => {
    await deleteMenuItem(menuId);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setMenuData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setMenuData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="menu-management">
      <h2>Menu Management</h2>
      <p>Manage the menus that will be available in the food delivery system.</p>

      <div className="sections-container">
        <div className="menu-info-container">
          <h3>Menu Information</h3>
          <form onSubmit={handleSave}>
            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name"><FaHamburger /> Menu Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Menu Name"
                  value={menuData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="price"><FaDollarSign /> Price</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={menuData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="image"><FaImage /> Image</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {menuData.image && (
                  <div className="image-preview">
                    <img src={URL.createObjectURL(menuData.image)} alt="Preview" className="preview-img" />
                  </div>
                )}
              </div>

              <div className="form-field description-field">
                <label htmlFor="description"><FaRegListAlt /> Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={menuData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="button-container">
              <button type="submit" disabled={createLoading}>
                {createLoading ? 'Saving...' : 'Save Menu'}
              </button>
            </div>

            {createError && <p className="error-text">{createError}</p>}
            {createdMenu && <p className="success-text">Menu created successfully!</p>}
          </form>
        </div>

        <div className="table-container">
          <h3>Existing Menus</h3>
          {fetchLoading ? (
            <p>Loading menus...</p>
          ) : fetchError ? (
            <p className="error-text">Error fetching menus: {fetchError}</p>
          ) : (
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Menu Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menus.length > 0 ? (
                  menus.map((menu) => (
                    <tr key={menu._id}>
                      <td>
                        {menu.image && menu.image.startsWith('http') ? (
                          <img src={menu.image} alt={menu.name} className="menu-image" />
                        ) : (
                          'No Image'
                        )}
                      </td>
                      <td>{menu.name}</td>
                      <td>{menu.description}</td>
                      <td>${menu.price}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(menu._id)}
                          className="delete-button"
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? 'Deleting...' : <FaTrash />}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No menus found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {deleteError && <p className="error-text">{deleteError}</p>}
        </div>
      </div>
    </div>
  );
}

export default MenuManagement;
