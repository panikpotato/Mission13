import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/">Entertainment Agency</Link>
      <div className="navbar-nav">
        <Link className="nav-link" to="/entertainers">Entertainers</Link>
        <Link className="nav-link" to="/add">Add Entertainer</Link>
      </div>
    </nav>
  );
}

export default Navbar;
