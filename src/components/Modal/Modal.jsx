import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ src, onCloseModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => {
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  const handleCloseModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleCloseModal}>
      <div className="Modal">
        <img src={src} alt="" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string,
  onCloseModal: PropTypes.func,
};
