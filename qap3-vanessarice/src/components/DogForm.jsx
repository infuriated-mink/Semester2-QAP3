// src/components/DogForm.js
import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown'; 

const DogForm = ({ onFormSubmit }) => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [imageCount, setImageCount] = useState(1);

  useEffect(() => {
    // Fetch dog breeds and populate the state
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        const breedList = Object.keys(data.message);
        setBreeds(breedList);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(selectedBreed, imageCount);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="breedSelect">Select Dog Breed:</label>
        <Dropdown
          id="breedSelect"
          label={selectedBreed ? selectedBreed : 'Select Dog Breed'}
          options={breeds}
          onSelect={breed => setSelectedBreed(breed)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="imageCount">Number of Images:</label>
        <input
          type="number"
          id="imageCount"
          name="imageCount"
          min="1"
          max="100"
          value={imageCount}
          onChange={e => setImageCount(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Load Images</button>
    </form>
  );
};

export default DogForm;
