import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarAdmin from './NavbarAdmin';
import './AdminDashboard.css';

const AdminDashboard = ({ apiUrl }) => {
  const [userStats, setUserStats] = useState({ students: 0, employers: 0, admins: 0 });
  const [totalCourses, setTotalCourses] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user stats
        const userStatsResponse = await fetch(`${apiUrl}/admin/user-stats`);
        if (!userStatsResponse.ok) throw new Error('Error fetching user stats');
        const userStatsData = await userStatsResponse.json();
        setUserStats(userStatsData);

        // Fetch total courses
        const coursesResponse = await fetch(`${apiUrl}/admin/total-courses`);
        if (!coursesResponse.ok) throw new Error('Error fetching total courses');
        const coursesData = await coursesResponse.json();
        setTotalCourses(coursesData.totalCourses);

        // Fetch recent activities
        const activitiesResponse = await fetch(`${apiUrl}/admin/recent-activities`);
        if (!activitiesResponse.ok) throw new Error('Error fetching recent activities');
        const activitiesData = await activitiesResponse.json();
        setRecentActivities(activitiesData);

      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
   
    <div className="dashboard-container"> 
    <NavbarAdmin />
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>
      <nav className="navbar">
        <Link to="/admin/manage-courses" className="nav-link">Manage Courses</Link>
        <Link to="/admin/manage-users" className="nav-link">Manage Users</Link>
      </nav>
      <main className="main-content">
        {error && <p className="error-message">{error}</p>}
        <section className="stats-cards">
          <div className="card">
            <h2>Total Users</h2>
            <p>Students: {userStats.students}</p>
            <p>Employers: {userStats.employers}</p>
            <p>Admins: {userStats.admins}</p>
          </div>
          <div className="card">
            <h2>Total Courses</h2>
            <p>{totalCourses}</p>
          </div>
        </section>
        <section className="details-table">
          
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
