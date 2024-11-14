import { useEffect, useState } from "react";
// AIzaSyDDSW_hHVTmF2Y4f7xHWq02tnaG1iJVySI
import shelfImage from '../assets/shelf.png';
import bookImage from '../assets/book.jpg';
import NavBar from "../components/Navbar";
import ShelfImage from "../components/ShelfImage";
import BookImage from "../components/BookImage";
import BookForm from "../components/BookForm";
import Heading from "../components/Heading";
import { REFRESH_TOKEN, ACCESS_TOKEN, API_KEY } from "../constants";

const Home = ({onLogout}) => {

  // const checkBook = async (num) => {
  //   try {
  //     const res = await fetch(`http://127.0.0.1:8000/api/images/${num}/`, {
  //       method: 'GET',  // Changed from POST to GET
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Token ${ACCESS_TOKEN}`,  // Fixed typo in Authorization
  //       },
  //     });
  
  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }
  //     console.log(res.json())
  //     return res.json();  // Assuming you want to return the parsed JSON response
  //   } catch (error) {
  //     console.error("Error fetching the book:", error);  // Added error logging
  //     return null;  // You can choose how to handle errors
  //   }
  // };

  // const default1 = checkBook(1);
  const apiKey = API_KEY;
  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();
  const [book1, setBook1] = useState(bookImage);
  const [book2, setBook2] = useState(bookImage);
  const [book3, setBook3] = useState(bookImage);
  const [book4, setBook4] = useState(bookImage);
 

  const handleSearch = (e) => {
    const query = e.target.value;
    console.log('Search query:', query);
    // Implement search functionality here
  };

  const handleLogout = () => {
    console.log("Logging out")
    onLogout();
    window.location.reload();
  };

  const handleAddReview = () => {
    console.log("Navigating to add review...");
    // Implement navigation to Add Review page
  };

  const handleMyReviews = () => {
    console.log("Navigating to my reviews...");
    // Implement navigation to My Reviews page
  };

  const addBook= async (newBook) =>
  {
    const res = await fetch('http://127.0.0.1:8000/api/images/create/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${ACCESS_TOKEN}`
        },
        body: JSON.stringify(newBook)
      }
    );
    return;
  };

 
  const getBook = async (e,setBook,position) => {
   e.preventDefault();
   try {
    const fixedTitle = title.split(" ").join("%20");
    const fixedAuthor = author.split(" ").join("%20");
    const call = `https://www.googleapis.com/books/v1/volumes?q=intitle:${fixedTitle}+inauthor:${fixedAuthor}&key=${apiKey}`
    const res = await fetch(call)
    const data = await res.json();
    const link = data.items[0].volumeInfo.imageLinks.smallThumbnail;
    setBook(link);
    const newBook = 
    {
      fixedTitle,
      fixedAuthor,
      position,
      link
    }
    addBook(newBook);
  }
  catch (error) 
  {
      console.error('Error fetching book data:', error)
  }
  }
  
  return (
    <div style={{backgroundColor:" #eeeeee"}}>
      <NavBar 
        onSearch={handleSearch} 
        onLogout={handleLogout} 
        onAddReview={handleAddReview} 
        onMyReviews={handleMyReviews} 
      />
      <Heading/>
      <div style={{ display: "flex", justifyContent: "space-between", marginRight:"100px", marginLeft: "100px", marginTop: "40px", backgroundColor:"eeeeee"}}>
        <BookImage src = {book1} alt="Book 1"/>
        <BookImage src = {book2} alt="Book 2"/>
        <BookImage src = {book3} alt="Book 3"/>
        <BookImage src = {book4} alt="Book 4"/>
      </div>
      <ShelfImage/>
      <section style={{ display: "flex", backgroundColor:"#393e46" }}>

        <BookForm 
          onSubmit={(e) => getBook(e, setBook1, 1)}
          onTitleChange={(e) => setTitle(e.target.value)}
          onAuthorChange={(e) => setAuthor(e.target.value)}
        />
         <BookForm 
          onSubmit={(e) => getBook(e, setBook2)}
          onTitleChange={(e) => setTitle(e.target.value)}
          onAuthorChange={(e) => setAuthor(e.target.value)}
        />
         <BookForm 
          onSubmit={(e) => getBook(e, setBook3)}
          onTitleChange={(e) => setTitle(e.target.value)}
          onAuthorChange={(e) => setAuthor(e.target.value)}
        />
         <BookForm 
          onSubmit={(e) => getBook(e, setBook4)}
          onTitleChange={(e) => setTitle(e.target.value)}
          onAuthorChange={(e) => setAuthor(e.target.value)}
        />
      </section>
    </div>
  );
};

export default Home;