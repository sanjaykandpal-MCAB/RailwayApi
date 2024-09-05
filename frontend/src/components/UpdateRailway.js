import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateRailway() {
  const [railway, setRailway] = useState({
    name: '',
    trains: [],
    stations: [],
    routes: [],
    operatingHours: { start: '', end: '' },
    maintenanceSchedule: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRailway();
  }, []);

  const fetchRailway = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://read-service-dbcxf5azfwebh9hf.southindia-01.azurewebsites.net/railways/${id}`);
      setRailway(response.data);
    } catch (error) {
      console.error('Error fetching railway:', error);
      setError('Failed to load railway. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRailway(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOperatingHoursChange = (e) => {
    const { name, value } = e.target;
    setRailway(prevState => ({
      ...prevState,
      operatingHours: {
        ...prevState.operatingHours,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://update-service-afg4hrdyggcedzad.southindia-01.azurewebsites.net/update/${id}`, railway);
      navigate('/');
    } catch (error) {
      console.error('Error updating railway:', error);
      setError('Failed to update railway. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="container mt-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="container mt-5"><div className="alert alert-danger" role="alert">{error}</div></div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Update Railway</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Railway Name</label>
          <input type="text" className="form-control" id="name" name="name" value={railway.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="stations" className="form-label">Stations (comma-separated)</label>
          <input type="text" className="form-control" id="stations" name="stations" value={railway.stations.join(', ')} onChange={(e) => setRailway({...railway, stations: e.target.value.split(', ')})} required />
        </div>
        <div className="mb-3">
          <label htmlFor="routes" className="form-label">Routes (comma-separated)</label>
          <input type="text" className="form-control" id="routes" name="routes" value={railway.routes.join(', ')} onChange={(e) => setRailway({...railway, routes: e.target.value.split(', ')})} required />
        </div>
        <div className="mb-3">
          <label htmlFor="operatingHoursStart" className="form-label">Operating Hours Start</label>
          <input type="time" className="form-control" id="operatingHoursStart" name="start" value={railway.operatingHours.start} onChange={handleOperatingHoursChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="operatingHoursEnd" className="form-label">Operating Hours End</label>
          <input type="time" className="form-control" id="operatingHoursEnd" name="end" value={railway.operatingHours.end} onChange={handleOperatingHoursChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Railway</button>
      </form>
    </div>
  );
}

export default UpdateRailway;