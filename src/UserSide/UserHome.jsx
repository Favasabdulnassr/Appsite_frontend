import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/intercepor';
import UserHeader from './UserHeader';
import UserSideBar from './UserSideBar'

const UserHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await axiosInstance.get('/apps/');
        console.log('ddddddddddddddddddddddddddddddddddddddddddddddd',response.data);
        
        setApps(response.data);
      } catch (error) {
        console.error('Error fetching apps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.sub_category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(apps.map(app => app.category))];

  const handleDownload = (appLink) => {
    window.open(appLink, '_blank');
  };

  return (
    <div className="admin-container">
      <UserHeader onMenuClick={toggleSidebar} />
      <div className="admin-body">
        <UserSideBar isOpen={isSidebarOpen} />
        <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="page-content">
            <div className="page-header">
              <h2>Available Applications</h2>
              <div className="filter-section">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search apps..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
  <div className="loading">Loading apps...</div>
) : (
  <div className="">
    {filteredApps.map(app => (
      <div key={app.id} className="app-card">
        <div className="app-image">
          {app.image_url ? (
            <img src={app.image_url} alt={app.name} />
          ) : (
            <div className="placeholder-image">
              {app.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="app-info">
          <h3>{app.name}</h3>
          <div className="app-categories">
            <span className="category-tag">{app.category}</span>
            <span className="subcategory-tag">{app.sub_category}</span>
          </div>
          <div className="app-points">
            <span className="points-label">Earn</span>
            <span className="points-value">{app.points} Points</span>
          </div>
          <button
            className="download-button"
            onClick={() => handleDownload(app.app_link)}
          >
            Download App
          </button>
        </div>
      </div>
    ))}
  </div>
)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserHome;