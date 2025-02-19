import React, { useState, useEffect } from 'react';
import './Profile.css';
import axiosInstance from '../../services/intercepor';
import UserHeader from '../UserHeader';
import UserSidebar from '../UserSideBar';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    //   const [loading, setLoading] = useState(true);
    const [completedApps, setCompletedApps] = useState([]);
    const [points,SetPoints] = useState(null)
    const { first_name, role, last_name, email, phone_number, loading } = useSelector((state) => state.login)

   
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    useEffect(() => {
        const fetchPoints = async () => {
          try {
            const response = await axiosInstance.get('/points/');
            SetPoints(response.data);
            console.log('kkkkkkkkkkk',response.data);
            
          } catch (error) {
            console.error('Error fetching points:', error);
          } 
        };

        const fetchCompletedApps = async () => {
            try {
                const response = await axiosInstance.get('/tasks/');
                setCompletedApps(response.data);
                console.log('yyyyyyyyyyyyyyyyyyyyyyyyyy',response.data);
                
            } catch (error) {
                console.error('Error fetching completed apps:', error);
            }
        };
        
        fetchPoints()
        fetchCompletedApps();
    }, []);

    return (
        <div className="admin-container">
            <UserHeader onMenuClick={toggleSidebar} />
            <div className="admin-body">
                <UserSidebar isOpen={isSidebarOpen} />
                <main className={`main-content ${!isSidebarOpen ? 'expanded' : ''}`}>
                    <div className="profile-page-content">
                        <div className="profile-page-header">
                            <h2>User Profile</h2>
                        </div>

                        {loading ? (
                            <div className="loading">Loading profile...</div>
                        ) : (
                            <>
                                <div className="profile-card">
                                    <div className="profile-header">
                                        <div className="profile-avatar">
                                            {first_name?.charAt(0) || email?.charAt(0)}
                                        </div>
                                        <div className="profile-header-info">
                                            <h3>{first_name} {last_name}</h3>
                                            <span className="profile-role">{role}</span>
                                        </div>
                                    </div>

                                    <div className="profile-details">
                                        <div className="profile-detail-row">
                                            <div className="profile-detail-label">Email</div>
                                            <div className="profile-detail-value">{email}</div>
                                        </div>
                                        <div className="profile-detail-row">
                                            <div className="profile-detail-label">Phone Number</div>
                                            <div className="profile-detail-value">{phone_number}</div>
                                        </div>
                                      
                                    </div>
                                </div>

                                <div className="points-card">
                                    <div className="points-header">
                                        <h3>Points Overview</h3>
                                    </div>
                                    <div className="points-content">
                                        <div className="total-points">
                                            <div className="points-circle">
                                                <span className="points-number">{points?.total_points}</span>
                                                <span className="points-label">Total Points</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="completed-apps-section">
                                    <h3>Completed Applications</h3>

                                    {completedApps.length === 0 ? (
                                        <div className="no-apps-message">No applications completed yet.</div>
                                    ) : (
                                        <div className="completed-apps-list">
                                            {completedApps.map(app => (
                                                <div key={app.id} className="completed-app-card">
                                                    
                                                    <div className="completed-app-info">
                                                        <h4>{app.app_name}</h4>
                                                        
                                                        <div className="completion-details">
                                                            <div className="completion-date">
                                                                <span className="detail-label">Completed on:</span>
                                                                <span className="detail-value">{new Date(app.completed_at).toLocaleDateString()}</span>
                                                            </div>
                                                            <div className="earned-points">
                                                                <span className="detail-label">Earned:</span>
                                                                <span className="detail-value points-highlight">+{app.app_points} points</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserProfile;