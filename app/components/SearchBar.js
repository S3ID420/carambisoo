'use client';
import React, { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css'; // Import the CSS with creative animations

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // Implement search logic or filtering here
    console.log('Search query:', e.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          className="search-input"
          type="text"
          placeholder="Search flashcards..."
          value={query}
          onChange={handleSearch}
        />
        
      </div>
    </div>
  );
};

export default SearchBar;
