// src/components/Layout/Sidebar.js
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../Redux/loginReducer';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen }) => {
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
          to="/admin/Home"
          className={`nav-link ${location.pathname === '/admin/Home' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/admin/add-app"
          className={`nav-link ${location.pathname === '/admin/add-app' ? 'active' : ''}`}
        >
          Add Application
        </Link>

        <Link
          to="/admin/users"
          className={`nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}
        >
         Users
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

export default Sidebar;
