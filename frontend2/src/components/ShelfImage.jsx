import shelfImage from '../assets/shelf.png';

const ShelfImage = () => {
  return (
    <img 
      src={shelfImage}  
      style={{ width: "95%", height:"150px", display: "block", marginLeft: "auto", marginRight: "auto" }} 
      alt="Shelf"
    />
  );
};

export default ShelfImage;
