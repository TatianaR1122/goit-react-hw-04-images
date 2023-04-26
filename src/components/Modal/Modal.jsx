import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    src: PropTypes.string,
    onCloseModal: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  handleCloseModal = e => {
    if (e.code === 'Escape' || e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleCloseModal}>
        <div className="Modal">
          <img src={this.props.src} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
