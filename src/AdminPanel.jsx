import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiMenu,
  FiLogOut,
  FiHome,
  FiPackage,
  FiBarChart2,
  FiSettings,
} from 'react-icons/fi';
import './AdminPanel.css';

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Aurora Alpha Jacket',
      category: 'Outerwear',
      price: 249,
      stock: 45,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Stellar Core Hoodie',
      category: 'Streetwear',
      price: 149,
      stock: 62,
      status: 'Active',
    },
  ]);

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  // Handle form input
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Add or update product
  const handleSaveProduct = useCallback(() => {
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert('Please fill all fields');
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        status: 'Active',
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    // Reset form
    setFormData({ name: '', category: '', price: '', stock: '' });
    setEditingProduct(null);
    setShowProductForm(false);
  }, [formData, editingProduct]);

  // Edit product
  const handleEditProduct = useCallback((product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
    });
    setShowProductForm(true);
  }, []);

  // Delete product
  const handleDeleteProduct = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }, []);

  // Close form
  const handleCloseForm = useCallback(() => {
    setShowProductForm(false);
    setEditingProduct(null);
    setFormData({ name: '', category: '', price: '', stock: '' });
  }, []);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -250, opacity: 0 },
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <motion.aside
        className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        variants={sidebarVariants}
        animate={sidebarOpen ? 'open' : 'closed'}
        initial={sidebarOpen ? 'open' : 'closed'}
      >
        <div className="sidebar-header">
          <h2>MMB Admin</h2>
          <button className="close-sidebar" onClick={() => setSidebarOpen(false)}>
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiHome />
            <span>Dashboard</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FiPackage />
            <span>Products</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <FiBarChart2 />
            <span>Analytics</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings />
            <span>Settings</span>
          </button>
        </nav>

        <button className="logout-btn">
          <FiLogOut />
          <span>Logout</span>
        </button>
      </motion.aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <h1 className="page-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          <div className="user-info">Admin User</div>
        </div>

        {/* Content Area */}
        <div className="admin-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <motion.div className="dashboard-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="stat-card">
                <h3>Total Products</h3>
                <p className="stat-value">{products.length}</p>
                <span className="stat-change">+2 this month</span>
              </div>
              <div className="stat-card">
                <h3>Total Revenue</h3>
                <p className="stat-value">$12,450</p>
                <span className="stat-change positive">+15% increase</span>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-value">324</p>
                <span className="stat-change">+28 today</span>
              </div>
              <div className="stat-card">
                <h3>Active Users</h3>
                <p className="stat-value">1,240</p>
                <span className="stat-change positive">+85 online</span>
              </div>
            </motion.div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="products-header">
                <h2>Product Management</h2>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({ name: '', category: '', price: '', stock: '' });
                    setShowProductForm(true);
                  }}
                >
                  <FiPlus /> Add Product
                </button>
              </div>

              {/* Product Form Modal */}
              {showProductForm && (
                <div className="modal-overlay" onClick={handleCloseForm}>
                  <motion.div
                    className="modal-content"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="modal-header">
                      <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                      <button className="modal-close" onClick={handleCloseForm}>
                        <FiX />
                      </button>
                    </div>

                    <form className="product-form">
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                        />
                      </div>

                      <div className="form-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange}>
                          <option value="">Select category</option>
                          <option value="Outerwear">Outerwear</option>
                          <option value="Streetwear">Streetwear</option>
                          <option value="Casual">Casual</option>
                          <option value="Formal">Formal</option>
                          <option value="Accessories">Accessories</option>
                        </select>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label>Price ($)</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            step="0.01"
                          />
                        </div>

                        <div className="form-group">
                          <label>Stock</label>
                          <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="form-actions">
                        <button type="button" className="btn-primary" onClick={handleSaveProduct}>
                          <FiSave /> Save Product
                        </button>
                        <button type="button" className="btn-secondary" onClick={handleCloseForm}>
                          <FiX /> Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}

              {/* Products Table */}
              <div className="products-table-container">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>${product.price}</td>
                        <td>{product.stock}</td>
                        <td>
                          <span className={`status-badge status-${product.status.toLowerCase()}`}>
                            {product.status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button
                            className="btn-icon edit"
                            onClick={() => handleEditProduct(product)}
                            title="Edit"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            className="btn-icon delete"
                            onClick={() => handleDeleteProduct(product.id)}
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2>Analytics Dashboard</h2>
              <div className="coming-soon">
                <p>Analytics feature coming soon...</p>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2>Settings</h2>
              <div className="coming-soon">
                <p>Settings page coming soon...</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
