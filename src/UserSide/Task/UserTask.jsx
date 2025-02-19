import React, { useState, useEffect } from 'react';
import './UserTask.css'
import axiosInstance from '../../services/intercepor';
import UserHeader from '../UserHeader';
import UserSidebar from '../UserSideBar';
import { toast } from 'react-toastify';
const UserTask = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetchApps();
    fetchCompletedTasks();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await axiosInstance.get('/apps/');
      console.log('aaaaaaaaaaaaaaaaaaaaa',response.data);
      
      setApps(response.data);
    } catch (error) {
      console.error('Error fetching apps:', error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const response = await axiosInstance.get('/tasks/');
      setCompletedTasks(response.data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedApp || !screenshot) {
      alert('Please select an app and upload a screenshot');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('app', selectedApp);
    formData.append('screenshot', screenshot);

    try {
      await axiosInstance.post('/tasks/', formData);
      toast.success('Task submitted successfully!');
      setSelectedApp('');
      setScreenshot(null);
      setPreviewUrl(null);
      fetchCompletedTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
      toast.error('Error submitting task. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  console.log('Rendering with apps:', apps);
  console.log('Rendering with tasks:', completedTasks);

  const findAppName = (appId) => {
    const app = apps.find(app => app.id === appId);
    return app ? app.name : 'Unknown App';
  };

  return (
    <div className="admin-container">
      <UserHeader onMenuClick={toggleSidebar} />
      <div className="admin-body">
        <UserSidebar isOpen={isSidebarOpen} />
        <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
          <div className="task-page">
            <h2 className="task-title">Submit Task Completion</h2>
            
            <div className="task-container">
              <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                  <label htmlFor="app-select">Select Application</label>
                  <select
                    id="app-select"
                    value={selectedApp}
                    onChange={(e) => setSelectedApp(e.target.value)}
                    className="app-select"
                  >
                    <option value="">Select an app</option>
                    {apps.length > 0 ? (
                      apps.map(app => (
                        <option key={app.id} value={app.id}>
                          {app.name} ({app.points} points)
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>Loading apps...</option>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="screenshot-upload">Upload Screenshot</label>
                  <input
                    type="file"
                    id="screenshot-upload"
                    accept="image/*"
                    onChange={handleScreenshotChange}
                    className="file-input"
                  />
                  {previewUrl && (
                    <div className="preview-container">
                      <img src={previewUrl} alt="Screenshot preview" className="preview-image" />
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Task'}
                </button>
              </form>

              <div className="completed-tasks">
                <h3>Completed Tasks</h3>
                <div className="tasks-list">
                  {completedTasks.map(task => (
                    <div key={task.id} className="task-card">
                      <div className="task-info">
                        <h4>{apps.find(app => app.id === task.app)?.name}</h4>
                        <p>Submitted: {new Date(task.completed_at).toLocaleDateString()}</p>
                        <span className={`status ${task.is_verified ? 'verified' : 'pending'}`}>
                          {task.is_verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      <div className="task-screenshot">
                        <img src={task.screenshot} alt="Task screenshot" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserTask;