// NavBar.js
import React from 'react';

const NavBar = ({ onSearch, onLogout, onAddReview, onMyReviews }) => {
  return (
    <nav style={navStyle}>
      <button onClick={onLogout} style={buttonStyle}>Logout</button>
      <button onClick={onAddReview} style={buttonStyle}>Add Review</button>
      <button onClick={onMyReviews} style={buttonStyle}>My Reviews</button>
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={onSearch} 
        style={searchBarStyle} 
      />
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'left',
  padding: '10px 20px',
  backgroundColor: ' #222831',
  color: '#fff',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#555',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const searchBarStyle = {
  padding: '10px',
  width: '200px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

export default NavBar;
