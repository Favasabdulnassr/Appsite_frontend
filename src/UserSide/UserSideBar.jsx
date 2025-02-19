// src/components/Layout/Sidebar.js
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../Redux/loginReducer';
import { toast } from 'react-toastify';

const UserSidebar = ({ isOpen }) => {
  const location = useLocation();
  const dispatch =  useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    toast.success("Successfully logged out")

  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <Link
          to="/user/Home"
          className={`nav-link ${location.pathname === '/user/Home' ? 'active' : ''}`}
        >
          Home
        </Link>

        <Link
          to="/user/task"
          className={`nav-link ${location.pathname === '/user/task' ? 'active' : ''}`}
        >
          Task
        </Link>

        <Link
          to="/user/profile"
          className={`nav-link ${location.pathname === '/user/profile' ? 'active' : ''}`}
        >
          Profile
        </Link>






        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      
      </nav>
    </aside>
  );
};

export default UserSidebar;
