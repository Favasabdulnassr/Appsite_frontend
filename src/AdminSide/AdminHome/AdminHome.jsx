import React, { useState } from 'react';
import './AdminHome.css';

import Header from '../Header';
import Sidebar from '../Sidebar';
import AdminApps from '../AdminAddApp/AdminApp';

const AdminHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-container">
      <Header onMenuClick={toggleSidebar} />
      <div className="admin-body">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <AdminApps/>    
        </main>
      </div>
    </div>
  );
};


export default AdminHome