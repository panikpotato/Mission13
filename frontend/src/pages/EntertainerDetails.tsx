import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { getEntertainer, deleteEntertainer } from '../api/EntertainerApi';

function EntertainerDetails() {
  const [entertainer, setEntertainer] = useState<Entertainer | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (id) {
        const data = await getEntertainer(parseInt(id));
        setEntertainer(data);
      }
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    if (
      id &&
      window.confirm('Are you sure you want to delete this entertainer?')
    ) {
      await deleteEntertainer(parseInt(id));
      navigate('/entertainers');
    }
  };

  if (!entertainer) return <div className="mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{entertainer.entStageName}</h2>
      <ul className="list-group mb-4">
        <li className="list-group-item">
          <strong>SSN:</strong> {entertainer.entSsn}
        </li>
        <li className="list-group-item">
          <strong>Street:</strong> {entertainer.entStreetAddress}
        </li>
        <li className="list-group-item">
          <strong>City:</strong> {entertainer.entCity}
        </li>
        <li className="list-group-item">
          <strong>State:</strong> {entertainer.entState}
        </li>
        <li className="list-group-item">
          <strong>Zip:</strong> {entertainer.entZipCode}
        </li>
        <li className="list-group-item">
          <strong>Phone:</strong> {entertainer.entPhoneNumber}
        </li>
        <li className="list-group-item">
          <strong>Web Page:</strong> {entertainer.entWebPage}
        </li>
        <li className="list-group-item">
          <strong>Email:</strong> {entertainer.entEmailAddress}
        </li>
        <li className="list-group-item">
          <strong>Date Entered:</strong> {entertainer.dateEntered}
        </li>
      </ul>

      <div className="d-flex gap-3">
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/edit/${entertainer.entertainerId}`)}
        >
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate('/entertainers')}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default EntertainerDetails;
