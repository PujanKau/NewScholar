import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ViewApplications.css';

const ViewApplications = ({ apiUrl }) => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/jobs/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const jobData = await response.json();
        setJobTitle(jobData.jobTitle);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch(`${apiUrl}/applications/job/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }
        const data = await response.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
    fetchApplications();
  }, [apiUrl, jobId]);

  const handleRejectApplication = async (applicationId) => {
    try {
      const response = await fetch(`${apiUrl}/applications/${applicationId}/reject`, {
        method: 'PATCH',
      });

      if (response.ok) {
        setSuccessMessage('Application rejected successfully.');
        setTimeout(() => {
          navigate(`/employer/view-applications/${jobId}`);
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to reject application.');
      }
    } catch (error) {
      setError(error.message || 'Failed to reject application.');
    }
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (successMessage) {
    return <div className="success-message">{successMessage}</div>;
  }

  if (applications.length === 0) {
    return <div>No applications found for this job.</div>;
  }

  return (
    <div className="applications-container">
      <h2>Applications for Job: {jobTitle}</h2>
      <div className="application-cards">
        {applications.map(app => (
          <div key={app.id} className="application-card">
            <h3>{app.firstName} {app.lastName}</h3>
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Desired Compensation:</strong> {app.desiredCompensation}</p>
            <Link to={`/employer/application-details/${app.id}`} className="details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplications;
