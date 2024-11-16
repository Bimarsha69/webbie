import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">DevDash</Link>
        <div>
          <Link to="/" className={`mr-4 ${location.pathname === '/' ? 'font-bold' : ''}`}>Home</Link>
          {isLoggedIn && (
            <Link to="/dashboard" className={`mr-4 ${location.pathname === '/dashboard' ? 'font-bold' : ''}`}>Dashboard</Link>
          )}
          {isLoggedIn ? (
            <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Logout</button>
          ) : (
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
