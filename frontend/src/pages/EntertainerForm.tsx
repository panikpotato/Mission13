import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import {
  addEntertainer,
  updateEntertainer,
  getEntertainer,
} from '../api/EntertainerApi';

function EntertainerForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Entertainer>({
    entertainerId: 0,
    entStageName: '',
    entSsn: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEmailAddress: '',
    dateEntered: '',
  });

  useEffect(() => {
    if (id) {
      const load = async () => {
        const data = await getEntertainer(parseInt(id));
        setForm(data);
      };
      load();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateEntertainer(parseInt(id), form);
    } else {
      await addEntertainer(form);
    }
    navigate('/entertainers');
  };

  return (
    <div className="container mt-4">
      <h2>{id ? 'Edit' : 'Add'} Entertainer</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {[
            { label: 'Stage Name', name: 'entStageName' },
            { label: 'SSN', name: 'entSsn' },
            { label: 'Street Address', name: 'entStreetAddress' },
            { label: 'City', name: 'entCity' },
            { label: 'State', name: 'entState' },
            { label: 'Zip Code', name: 'entZipCode' },
            { label: 'Phone Number', name: 'entPhoneNumber' },
            { label: 'Web Page', name: 'entWebPage' },
            { label: 'Email Address', name: 'entEmailAddress' },
            { label: 'Date Entered', name: 'dateEntered', type: 'date' },
          ].map((field) => (
            <div className="col-md-6 mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type ?? 'text'}
                className="form-control"
                name={field.name}
                value={form[field.name as keyof Entertainer] ?? ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Add'} Entertainer
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/entertainers')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EntertainerForm;
