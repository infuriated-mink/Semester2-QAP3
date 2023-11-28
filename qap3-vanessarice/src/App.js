import React, { useState} from 'react';
import DogImages from './components/DogImages';
import './App.css';
import './css/header.css';
import './css/DropDown.css';
import './css/DogImages.css';
import './css/Button.css';
import './css/FirstBox.css';


const App = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [images, setImages] = useState([]);
  const [breedsLoaded, setBreedsLoaded] = useState(false);
  const [imageCount, setImageCount] = useState(0);
  const [loadBreedsButtonVisible, setLoadBreedsButtonVisible] = useState(true);

  const loadBreeds = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        const breedList = Object.keys(data.message);
        setBreeds(breedList);
        setBreedsLoaded(true);
        setLoadBreedsButtonVisible(false);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  };

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handleImageCountChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setImageCount(count);
  };

  const loadDogImages = () => {
    if (selectedBreed && imageCount > 0) {
      fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${imageCount}`)
        .then(response => response.json())
        .then(data => {
          setImages(data.message);
        })
        .catch(error => console.error('Error fetching images:', error));
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Dog Breed Viewer</h1>
        <p>Explore and enjoy images of different dog breeds!</p>
      </div>
      <div className="container mt-3">
        {loadBreedsButtonVisible && (
          <button className="btn btn-primary mb-3" onClick={loadBreeds}>
            Load Breeds
          </button>
        )}
        {breedsLoaded && (
          <div className="d-flex">
            <div className="form-group">
              <label htmlFor="breedSelect">Select a Breed:</label>
              <select
                id="breedSelect"
                className="form-control"
                onChange={handleBreedChange}
                value={selectedBreed}
              >
                <option value="">Select a breed</option>
                {breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group ml-3">
              <label htmlFor="imageCount">Number of Images (1-100):</label>
              <input
                type="number"
                id="imageCount"
                className="form-control"
                value={imageCount}
                onChange={handleImageCountChange}
                min="1"
                max="100"
              />
            </div>
            <button className="btn btn-primary ml-3 mb-3" onClick={loadDogImages}>
              Load Dog Images
            </button>
          </div>
        )}
        {images.length > 0 && (
          <DogImages images={images} breed={selectedBreed} />
        )}
      </div>
    </div>
  );
};

export default App;