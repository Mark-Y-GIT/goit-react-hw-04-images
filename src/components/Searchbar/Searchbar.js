import React, { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function SearchBar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = evt => {
    setInputValue(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (inputValue === ''.trim()) {
      toast.error('Error, request cannot be empty');
      return;
    }

    onSubmit(inputValue);

    setInputValue('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s['SearchForm-button']}>
          <span className={s['SearchForm-button-label']}>Search</span>
        </button>
        <input
          className={s['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          value={inputValue}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};
