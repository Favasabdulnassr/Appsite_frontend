import { useSelector } from "react-redux";

const UserHeader = ({ onMenuClick }) => {
  const {first_name} = useSelector((state) => state.login)
    return (
      <header className="admin-header">
        <div className="header-content">
          <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle Menu">
            <span className="hamburger-icon"></span>
          </button>
          <h1>User {first_name}</h1>
        </div>
      </header>
    );
  };
  
  
  export default UserHeader