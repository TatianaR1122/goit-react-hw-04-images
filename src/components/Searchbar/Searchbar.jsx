import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const [findValue, setFindValue] = useState('');

  const handelInputChange = event => {
    setFindValue(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!findValue) {
      return toast.info('Type something to find');
    }

    onSubmit(findValue);
    setFindValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm " onSubmit={handleSubmit}>
        <button className="SearchForm-button" type="submit">
          <FcSearch size="30" />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          value={findValue}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handelInputChange}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
