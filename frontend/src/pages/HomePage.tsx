import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to the Entertainment Agency</h1>
      <p className="lead">
        Browse and manage our list of talented entertainers available for booking.
      </p>
      <button className="btn btn-primary btn-lg mt-4" onClick={() => navigate('/entertainers')}>
        View Entertainers
      </button>
    </div>
  );
}

export default HomePage;
