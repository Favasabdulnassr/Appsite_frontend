import React, { useState } from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';
import AddApp from './AddApp';

const AdminAddapp = () => {
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
            <AddApp/>         
        </main>
      </div>
    </div>
  );
};


export default AdminAddapp