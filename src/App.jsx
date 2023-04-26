import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imagesAPI from './services/image-api';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Modal } from './components/Modal/Modal';
import { animateScroll } from 'react-scroll';
import Button from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import './App.css';

export class App extends Component {
  state = {
    findValue: '',
    pageNumber: 1,
    images: [],
    status: 'idle',
    error: null,
    showModal: false,
    largeImageURL: '',
    showBtn: false,
  };

  handleFormSubmit = findValue => {
    this.setState({
      findValue: findValue,
      pageNumber: 1,
      images: [],
    });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.findValue !== this.state.findValue ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      this.setState({ status: 'pending' });

      this.getImages();
    }

    if (prevState.pageNumber !== this.state.pageNumber) {
      this.scrollOnMoreButton();
    }
  }
  scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };
  getImages = () => {
    const { findValue, pageNumber } = this.state;

    imagesAPI
      .fetchImages(findValue, pageNumber)
      .then(({ hits, totalHits }) =>
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          status: 'resolved',
          showBtn: this.state.pageNumber < Math.ceil(totalHits / 12),
        }))
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  onOpenModal = url => {
    this.setState({ largeImageURL: url });
    this.modalToggle();
  };

  modalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { status, error, images, showModal, largeImageURL, showBtn } =
      this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          status={status}
          error={error}
          images={images}
          onClick={this.onOpenModal}
          onLoadMore={this.onLoadMore}
        />
        {showModal && (
          <Modal src={largeImageURL} onCloseModal={this.modalToggle} />
        )}
        {showBtn && <Button onLoadMore={this.onLoadMore} />}
        {status === 'idle' && <div className="Info">The gallery is empty</div>}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <div className="Info">We cant find it</div>}
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </div>
    );
  }
}
