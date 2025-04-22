import './App.css';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/HomePage';
import EntertainerList from './pages/EntertainerList';
import EntertainerDetails from './pages/EntertainerDetails';
import EntertainerForm from './pages/EntertainerForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/entertainers" element={<EntertainerList />} />
        <Route path="/entertainer/:id" element={<EntertainerDetails />} />
        <Route path="/add" element={<EntertainerForm />} />
        <Route path="/edit/:id" element={<EntertainerForm />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
