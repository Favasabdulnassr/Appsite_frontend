    import React, { useState, useEffect } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { toast } from 'react-toastify';
    import axiosInstance from '../../services/intercepor';
    import Header from '../Header';
    import Sidebar from '../Sidebar';
    import './UpdatePoints.css'

    const UpdatePoints = () => {
    const { appId } = useParams();
    const navigate = useNavigate();
    const [app, setApp] = useState(null);
    const [points, setPoints] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    //   const [Id,setId] = useState(null)

    useEffect(() => {
        
        fetchAppDetails();

    }, [appId]);

    const fetchAppDetails = async () => {
        
        
        try {
        const response = await axiosInstance.get(`/apps/${appId}/`);
        setApp(response.data);
        
        setPoints(response.data.points);
        } catch (error) {
        console.error('Error:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        await axiosInstance.patch(`/apps/${appId}/`, {
            points: parseInt(points)
        });
        toast.success('Points updated successfully');
        navigate('/admin/Home');
        } catch (error) {
        toast.error('Error updating points');
        console.error('Error:', error);
        } finally {
        setLoading(false);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (!app) {
        return (
        <div className="admin-container">
            <Header onMenuClick={toggleSidebar} />
            <div className="admin-body">
            <Sidebar isOpen={isSidebarOpen} />
            <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
                <div className="update-points-container">
                <div className="update-points-card">
                    <h2>Loading...</h2>
                </div>
                </div>
            </main>
            </div>
        </div>
        );
    }

    return (
        <div className="admin-container">
        <Header onMenuClick={toggleSidebar} />
        <div className="admin-body">
            <Sidebar isOpen={isSidebarOpen} />
            <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
            <div className="update-points-container">
                <div className="update-points-card">
                <h2>Update Points</h2>
                <div className="app-details">
                    <h3>{app.name}</h3>
                    <p>Current Points: {app.points}</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="points">New Points Value</label>
                    <input
                        type="number"
                        id="points"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        min="0"
                        required
                        className="points-input"
                    />
                    </div>
                    <div className="button-group">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/Home')}
                        className="cancel-button"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Points'}
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </main>
        </div>
        </div>
    );
    };

    export default UpdatePoints;