import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/intercepor';

const AdminApps = () => {
  const [apps, setApps] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await axiosInstance.get('/apps/');
      console.log('nooooooooooooooooooo',response.data);
      
      
      setApps(response.data);
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
  
        
        <div className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="page-content">
            <div className="page-header">
              <h2>Android Applications</h2>
              <button 
                className="button button-primary"
                onClick={() => navigate('/admin/add-app')}
              >
                Add New App
              </button>
            </div>
              {apps.map(app => (
                <div key={app.id} className="app-card">
                  {app.image_url && (
                    <div className="app-image">
                      <img src={app.image_url} alt={app.name} />
                    </div>
                  )}
                  <h3>{app.name}</h3>
                  <p>Category: {app.category}</p>
                  <p>Sub Category: {app.sub_category}</p>
                  <p>Points: {app.points}</p>
                  <button
                    className="update-points-btn"
                    onClick={() => navigate(`/admin/update-points/${app.id}`)}
                  >
                    Update Points
                  </button>
                </div>
              ))}
          </div>
        </div>

  );
};

export default AdminApps;