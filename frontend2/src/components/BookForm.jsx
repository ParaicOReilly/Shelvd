import React from 'react';

const BookForm = ({ onSubmit, onTitleChange, onAuthorChange }) => {
  return (
    <form className="form-container" style={{ display: "flex", maxWidth: "50px", maxHeight: "50px", border: "5px", backgroundColor:"#eeeeee"}} onSubmit={onSubmit}>
      <label style={{ margin: "1px", fontSize: "10px" }}>Book Name</label>
      <input onChange={onTitleChange} style={{ margin: "1px", fontSize: "10px" }} />
      <br />
      <label style={{ margin: "1px", fontSize: "10px" }}>Author</label>
      <input onChange={onAuthorChange} style={{ margin: "1px", fontSize: "10px" }} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookForm;
