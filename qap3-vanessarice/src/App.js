// src/App.js
import React, { useState } from 'react';
import DogForm from './components/DogForm';
import DogImages from './components/DogImages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [dogImages, setDogImages] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');

  const handleFormSubmit = (breed, imageCount) => {
    // Fetch dog images based on the selected breed and count
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/${imageCount}`)
      .then(response => response.json())
      .then(data => {
        setDogImages(data.message);
        setSelectedBreed(breed);
      })
      .catch(error => console.error('Error fetching images:', error));
  };

  return (
    <div className="container mt-3">
      <DogForm onFormSubmit={handleFormSubmit} />
      <DogImages images={dogImages} breed={selectedBreed} />
    </div>
  );
}

export default App;
