import React from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({
  id,
  webformatURL,
  largeImageURL,
  onClick,
}) {
  const handelImageClick = () => {
    onClick(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt=""
        onClick={handelImageClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
