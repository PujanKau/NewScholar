import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { getInitials } from '../utils/getInitials'; // Assuming you have this utility function
import './Navbar.css'; // Reusing the same CSS, assuming it's structured for reuse

const NavbarAdmin = ({ apiUrl }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user && user.userId) {
        try {
          const response = await fetch(`${apiUrl}/profile/${user.userId}`);
          if (response.ok) {
            const data = await response.json();
            setProfilePictureUrl(data.profilePicture || null); // Set profile picture if available
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      }
    };

    fetchProfilePicture();
  }, [user, apiUrl]);

  const handleLogout = () => {
    // Clear user context and redirect to the landing page
    setUser({ userId: null, userType: null, fullName: '', initials: '' });
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate(`/admin/profile/${user.userId}`);
  };

  return (
    <nav className="navbar navbar-admin">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Admin Panel Logo" />
      </div>
      <div className="navbar-links">
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/manage-courses">Manage Courses</Link>
        <Link to="/admin/manage-users">Manage Users</Link>
      </div>
      <div className="navbar-profile">
        {user.userId ? (
          <>
            <div className="profile-link" onClick={handleProfileClick}>
              {profilePictureUrl ? (
                <img
                  src={profilePictureUrl}
                  alt="Profile"
                  className="profile-picture"
                  onError={() => setProfilePictureUrl(null)} // Fallback to initials if image fails
                />
              ) : (
                <div className="profile-initials">{getInitials(user.fullName)}</div>
              )}
              <div className="profile-name">{user.fullName}</div>
            </div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavbarAdmin;
