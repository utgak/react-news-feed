import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand ms-3" to="/">React news feed</Link>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">Главная</Link>
        </li>
        <li className="nav-item">
          <Link to="/news" className="nav-link">Новости</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;