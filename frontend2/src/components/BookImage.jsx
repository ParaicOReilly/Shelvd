const BookImage = ({ src, alt, onClick }) => {
  return (
    <img 
      src={src} 
      onClick={onClick} 
      style={{ width: "10%", height: "10%" }} 
      alt={alt} 
    />
  );
};

export default BookImage;
