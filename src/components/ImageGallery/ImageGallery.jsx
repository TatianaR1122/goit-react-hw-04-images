import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import './ImageGallery.css';

export class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.string,
    images: PropTypes.array,
  };

  handelImageClick = imageURL => {
    this.props.onClick(imageURL);
  };

  render() {
    const { images } = this.props;

    return (
      <>
        <ul className="ImageGallery">
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={this.handelImageClick}
            />
          ))}
        </ul>
      </>
    );
  }
}
