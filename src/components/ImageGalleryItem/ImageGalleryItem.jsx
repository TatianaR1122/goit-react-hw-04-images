import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export class ImageGalleryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  handelImageClick = () => {
    this.props.onClick(this.props.largeImageURL);
  };

  render() {
    const { id, webformatURL } = this.props;

    return (
      <li className="ImageGalleryItem" key={id}>
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt=""
          onClick={this.handelImageClick}
        />
      </li>
    );
  }
}
