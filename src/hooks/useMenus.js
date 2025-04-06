import { useState, useEffect } from 'react';
import { createMenu, deleteMenu, getMenus } from '../services/menuService.js';

const useMenus = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [createdMenu, setCreatedMenu] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const [menus, setMenus] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const createNewMenu = async (formData) => {
    setCreateLoading(true);
    setCreateError(null);
    try {
      const data = await createMenu(formData);
      setCreatedMenu(data);
      setMenus(prev => [...prev, data]);
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const deleteMenuItem = async (menuId) => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await deleteMenu(menuId);
      setMenus(prev => prev.filter(menu => menu._id !== menuId));
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchMenus = async () => {
      setFetchLoading(true);
      setFetchError(null);
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return {
    createNewMenu,
    deleteMenuItem,
    menus,
    createLoading,
    deleteLoading,
    fetchLoading,
    createError,
    deleteError,
    fetchError,
    createdMenu,
  };
};

export default useMenus;
