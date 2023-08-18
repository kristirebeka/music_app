import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [authors, setAuthors] = useState([]);
  const [musicians, setMusicians] = useState([]);

  const handleAuthorSearch = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/search/authors.json?q=${searchTerm}`);
      setAuthors(response.data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMusicianSearch = async () => {
    try {
      const response = await axios.get(`http://musicbrainz.org/ws/2/artist/?query=${searchTerm}&fmt=json`);
      setMusicians(response.data.artists);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div>
        <input
            className="custom-input"
            type="text"
            placeholder="Write your text here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="my-button" onClick={handleAuthorSearch}>Retrieve Authors</button>
        <button className="my-button" onClick={handleMusicianSearch}>Retrieve Musicians</button>


        {authors.length > 0 && (
            <div>
              <h2>Authors</h2>
              {authors.map((author) => (
                  <div key={author.key}>
                    <p>{author.name}</p>
                  </div>
              ))}
            </div>
        )}

        {musicians.length > 0 && (
            <div>
              <h2>Musicians</h2>
              {musicians.map((musician) => (
                  <div key={musician.id}>
                    <p>{musician.name}</p>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}

export default App;
