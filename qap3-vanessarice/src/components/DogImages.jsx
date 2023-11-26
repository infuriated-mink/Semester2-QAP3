import React from 'react';
import '../css/DogImages.css'; 

const DogImages = ({ images, breed, subBreed }) => {
  return (
    <div className="row mt-3">
      {images.map((imageUrl, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card h-100">
            <img src={imageUrl} alt={`Dog ${index + 1}`} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{subBreed ? `${subBreed} ${breed}` : breed}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DogImages;
