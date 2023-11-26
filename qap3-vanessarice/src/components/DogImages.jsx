import React from 'react';
import '../css/DogImages.css'; 

const DogImages = ({ images, breed }) => {
    return (
      <div className="card-container">
        {images.map((imageUrl, index) => (
          <div key={index} className="card">
            <img className="card-img-top" src={imageUrl} alt={`Dog ${index + 1}`} />
            <div className="card-body">
            </div>
          </div>
        ))}
      </div>
    );
  };

export default DogImages;