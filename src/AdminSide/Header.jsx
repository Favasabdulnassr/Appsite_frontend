const Header = ({ onMenuClick }) => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle Menu">
          <span className="hamburger-icon"></span>
        </button>
        <h1>Admin Dashboard</h1>
      </div>
    </header>
  );
};


export default Header