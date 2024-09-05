import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ReadOnly() {
  const [railways, setRailways] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRailways();
  }, []);

  const fetchRailways = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5009/railways');
      console.log(response.data[0].updatedAt);
      
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

  if (isLoading) {
    return <div className="container mt-5"><div className="spinner-grow text-primary" role="status"></div></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger" role="alert">{error}</div></div>;
  }

  return (
    <div className="container-fluid mt-5">
      <h1 className="mb-4 text-center">Railway Information System</h1>
      {railways.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {railways.map((railway) => (
            <div key={railway._id} className="col">
              <div className="card h-100 shadow-sm">
                <div className="card-header bg-info text-white">
                  <h2 className="h5 mb-0">
                    <Link to={`/railways/${railway._id}`} className="text-white text-decoration-none">{railway.name}</Link>
                  </h2>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Trains</h5>
                  <div className="table-responsive">
                    <table className="table table-sm table-hover">
                      <thead className="table-light">
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
                  </div>

                  <h5 className="mt-3">Stations</h5>
                  <p className="mb-0"><small>{railway.stations.join(', ')}</small></p>

                  <h5 className="mt-3">Routes</h5>
                  <p className="mb-0"><small>{railway.routes.join(', ')}</small></p>

                  <h5 className="mt-3">Operating Hours</h5>
                  <p className="mb-0"><small>{formatTime(railway.operatingHours.start)} - {formatTime(railway.operatingHours.end)}</small></p>

                  <h5 className="mt-3">Maintenance Schedule</h5>
                  <ul className="list-group list-group-flush">
                    {railway.maintenanceSchedule.map((schedule, index) => (
                      <li key={index} className="list-group-item p-2">
                        <small><strong>{new Date(schedule.date).toLocaleDateString()}</strong>: {schedule.description}</small>
                      </li>
                    ))}
                  </ul>
                  
                </div>
                <h6>UpdatedAt</h6>
                <p><span className='fst-italic'>{railway.updatedAt}</span></p>
                  
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">No railways available.</div>
      )}
    </div>
  );
}

export default ReadOnly;