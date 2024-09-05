import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

function RailwayList() {
  const [railways, setRailways] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchRailways();
  }, []);

  const fetchRailways = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://read-service-dbcxf5azfwebh9hf.southindia-01.azurewebsites.net/railways');
      if (Array.isArray(response.data)) {
        setRailways(response.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setRailways([]);
      }
    } catch (error) {
      console.error('Error fetching railways:', error);
      setError('Failed to load railways. Please try again.');
      setRailways([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time) => {
    return time ? new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A';
  };

  const deleteRailway = async (id) => {
    try {
      await axios.delete(`https://delete-service-c4gsfdg6hpgtcaa0.southindia-01.azurewebsites.net/railways/${id}`);
      setRailways(prevRailways => prevRailways.filter(railway => railway._id !== id));
    } catch (error) {
      console.error('Error deleting railway:', error);
      setError('Failed to delete railway. Please try again.');
    }
  };
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  if (isLoading) {
    return <div className="container mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger" role="alert">{error}</div></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Railway API</h1>
      <Link to="/add" className="btn btn-primary mb-4">Add New Railway</Link>
      {railways.length > 0 ? (
        railways.map((railway) => (
          <div key={railway._id} className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">
                <Link to={`/railways/${railway._id}`} className="text-white text-decoration-none">{railway.name}</Link>
              </h2>
            </div>
            <div className="card-body">
              <h5 className="card-title">Trains</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Type</th>
                    <th>Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {railway.trains.map((train, index) => (
                    <tr key={index}>
                      <td>{train.trainNumber}</td>
                      <td>{train.trainType}</td>
                      <td>{train.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h5 className="mt-4">Stations</h5>
              <p>{railway.stations.join(', ')}</p>

              <h5 className="mt-4">Routes</h5>
              <p>{railway.routes.join(', ')}</p>

              <h5 className="mt-4">Operating Hours</h5>
              <p>{formatTime(railway.operatingHours.start)} - {formatTime(railway.operatingHours.end)}</p>

              <h5 className="mt-4">Maintenance Schedule</h5>
              <ul className="list-group">
                {railway.maintenanceSchedule.map((schedule, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{new Date(schedule.date).toLocaleDateString()}</strong>: {schedule.description}
                  </li>
                ))}
              </ul>
            </div>
            <h6>UpdatedAt</h6>
            <p><span className='fst-italic'>{railway.updatedAt}</span></p>
            <div className="card-footer">
              <button onClick={() => handleUpdate(railway._id)} className="btn btn-warning me-2">Update</button>
              <button onClick={() => deleteRailway(railway._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info" role="alert">No railways available.</div>
      )}
    </div>
  );
}

export default RailwayList;