import { useState } from 'react';
import './SearchBar.css';
import { FiSearch, FiX } from 'react-icons/fi';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <FiSearch className="search-icon" size={20} />
      <input
        type="text"
        placeholder="Search images by tag..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {query && (
        <button className="clear-btn" onClick={handleClear} title="Clear">
          <FiX size={20} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
