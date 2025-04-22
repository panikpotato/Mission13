import { useEffect, useState } from 'react';
import { Entertainer } from '../types/Entertainer';
import { fetchEntertainers } from '../api/EntertainerApi';
import { useNavigate } from 'react-router-dom';

function EntertainerList() {
  const [entertainers, setEntertainers] = useState<Entertainer[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); // Simulated for now
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await fetchEntertainers();
      setEntertainers(data);
      setTotalPages(Math.ceil(data.length / pageSize));
    };
    load();
  }, [pageSize]);

  const paginated = entertainers.slice((pageNum - 1) * pageSize, pageNum * pageSize);

  return (
    <div className="container mt-4">
      <h2>Entertainers</h2>
      

      {paginated.map((ent) => (
        <div key={ent.entertainerId} className="card mb-3">
          <div className="card-header">
            <h5 className="mb-0">{ent.entStageName}</h5>
          </div>
          <div className="card-body">
            <ul className="list-unstyled mb-0">
              <li><strong>Times Booked:</strong> {ent.bookingCount ?? 0}</li>
              <li>
                <strong>Last Booking Date:</strong>{' '}
                {ent.lastBookingDate ? new Date(ent.lastBookingDate).toLocaleDateString() : 'N/A'}
              </li>
            </ul>
            <button className="btn btn-outline-info mt-2" onClick={() => navigate(`/entertainer/${ent.entertainerId}`)}>
              Details
            </button>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center gap-2 mt-4">
        <button className="btn btn-outline-secondary" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn ${pageNum === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setPageNum(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-secondary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
          
        </button>
        
      </div>
      
      {/* Page size selector */}
      <div className="mt-3">
        <label>
          Results per page:&nbsp;
          <select value={pageSize} onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
        <br />
        <br />
      <button className="btn btn-primary mb-3" onClick={() => navigate('/add')}>
        Add Entertainer
      </button>
      </div>
    </div>
  );
}

export default EntertainerList;
