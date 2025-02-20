import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import './AdminUsers.css'
import Header from '../Header';
import Sidebar from '../Sidebar';
import axiosInstance from '../../services/intercepor';
const UsersAdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axiosInstance.get('/tasks/');
      console.log('task kitttyyyyyyyy',response.data);
      
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch tasks');
      setLoading(false);
    }
  };

  const handleVerify = async (taskId) => {
    try {
      await axiosInstance.post(`/tasks/${taskId}/verify_task/`);
      toast.success('Task verified successfully');
      fetchTasks();
    } catch (error) {
        console.log('FFFFFFFFFFFFFFFFFFFFfff',error);
        
      toast.error('Failed to verify task');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredTasks = tasks.filter(task => 
    task.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.app_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <Header onMenuClick={toggleSidebar} />
      <div className="admin-body">
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="page-content">
            <div className="page-header">
              <h2>Completed Tasks</h2>
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search by user email or app name..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-lg text-gray-600">Loading...</div>
              </div>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>App Name</th>
                      <th>Screenshot</th>
                      <th>Completed At</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTasks.map((task) => (
                      <tr key={task.id}>
                        <td>
                          <div className="flex flex-col">
                            <span className="font-medium">{task.user_email}</span>
                            
                          </div>
                        </td>
                        <td>{task.app_name}</td>
                        <td>
                          <img 
                            src={task.screenshot_url}
                            alt="Task Screenshot"
                            className="w-20 h-20 object-cover rounded"
                          />
                        </td>
                        <td>
                          {new Date(task.completed_at).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`status-badge ${
                            task.is_verified ? 'verified' : 'pending'
                          }`}>
                            {task.is_verified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td>
                          {!task.is_verified && (
                            <button
                              onClick={() => handleVerify(task.id)}
                              className="button button-primary"
                            >
                              Verify
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UsersAdminPage;