import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

import './ImageGallery.css';

export default function ImageGallery({ images, onClick }) {
  const handelImageClick = imageURL => {
    onClick(imageURL);
  };

  return (
    <>
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={handelImageClick}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func,
};
