import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import StudentAuthPage from './Components/StudentAuthPage';
import AdminAuthPage from './Components/AdminAuthPage';
import ManageCourses from './Components/ManageCourses';
import ViewCourses from './Components/ViewCourses';
import AddCourse from './Components/AddCourse';

import ManageUsers from './Components/ManageUsers';
import AddUser from './Components/AddUser';
import ViewUsers from './Components/ViewUsers';
import EmployerAuthPage from './Components/EmployerAuthPage';
import StudentOnboarding from './Components/StudentOnboarding';
import StudentDashboard from './Components/StudentDashboard';
import JobListings from './Components/JobListings';
import EmployerDashboard from './Components/EmployerDashboard';
import AdminDashboard from './Components/AdminDashboard';
import PostJob from './Components/PostJob';

import JobDetails from './Components/JobDetails';
import ViewApplications from './Components/ViewApplications';
import ApplicationDetails from './Components/ApplicationDetails';
import Courses from './Components/Courses';
import ApplyJobForm from './Components/ApplyJobForm'; 
import EmployerDetails from './Components/EmployerDetails';

import { UserProvider } from './Components/UserContext';
import { JobProvider } from './Components/JobContext';
import PrivacyPolicy from './Components/PrivacyPolicy';
import SavedJobs from './Components/SavedJobs';
import AppliedJobs from './Components/AppliedJobs';
import {Profile}from './Components/Profile';  // Import the Profile component
import './App.css';

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <UserProvider>
      <JobProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/student" element={<StudentAuthPage apiUrl={apiUrl} />} />
              <Route path="/admin" element={<AdminAuthPage apiUrl={apiUrl} />} />
              <Route path="/employer" element={<EmployerAuthPage apiUrl={apiUrl} />} />

              {/* Student Routes */}
              <Route path="/student-onboarding" element={<StudentOnboarding />} />
              <Route path="/student/dashboard/:userID" element={<StudentDashboard apiUrl={apiUrl} />} />
              <Route path="/jobs" element={<JobListings apiUrl={apiUrl} />} />
              <Route path="/apply-job/:jobId" element={<ApplyJobForm apiUrl={apiUrl} />} />
              <Route path="/job-details/:jobId" element={<JobDetails apiUrl={apiUrl} />} />
              <Route path="/courses" element={<Courses apiUrl={apiUrl}/>} />
              <Route path="/saved" element={<SavedJobs apiUrl={apiUrl} />} />
              <Route path="/applied" element={<AppliedJobs apiUrl={apiUrl} />} />
              <Route path="/student/profile/:userID" element={<Profile apiUrl={apiUrl} />} /> {/* Add student profile route */}

              {/* Employer Routes */}
              <Route path="/employer/dashboard/:userID" element={<EmployerDashboard apiUrl={apiUrl} />} />
              <Route path="/employer/post-job" element={<PostJob apiUrl={apiUrl} />} />
        
              <Route path="/employer/view-applications/:jobId" element={<ViewApplications apiUrl={apiUrl} />} />
              <Route path="/employer/application-details/:applicationId" element={<ApplicationDetails apiUrl={apiUrl} />} />
              <Route path="/employers/:employerId" element={<EmployerDetails apiUrl={apiUrl} />} />
              <Route path="/employer/profile/:userID" element={<Profile apiUrl={apiUrl} />} /> {/* Add employer profile route */}

              {/* Admin Routes */}
              <Route path="/admin/dashboard/:userID" element={<AdminDashboard apiUrl={apiUrl} />} />
              <Route path="/admin/manage-courses" element={<ManageCourses apiUrl={apiUrl} />} />
              <Route path="/admin/view-courses" element={<ViewCourses />} />
              <Route path="/admin/add-course" element={<AddCourse apiUrl={apiUrl} />} />
              
              <Route path="/admin/manage-users" element={<ManageUsers apiUrl={apiUrl}/>} />
              <Route path="/admin/add-user" element={<AddUser apiUrl={apiUrl}/>} />
              <Route path="/admin/view-users" element={<ViewUsers />} />
              <Route path="/admin/profile/:userID" element={<Profile apiUrl={apiUrl} />} /> {/* Add admin profile route */}
            </Routes>
          </div>
        </Router>
      </JobProvider>
    </UserProvider>
  );
}

export default App;
