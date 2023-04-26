import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

import './Searchbar.css';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    findValue: '',
  };

  handelInputChange = event => {
    this.setState({ findValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { findValue } = this.state;

    event.preventDefault();

    if (!findValue) {
      return toast.info('Type something to find');
    }

    this.props.onSubmit(findValue);
    this.setState({ findValue: '' });
  };

  render() {
    const { findValue } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm " onSubmit={this.handleSubmit}>
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
            onChange={this.handelInputChange}
          />
        </form>
      </header>
    );
  }
}
