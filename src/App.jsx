import { useState, useEffect, useRef } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imagesAPI from './services/image-api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import { animateScroll } from 'react-scroll';
import Button from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

import './App.css';

export default function App() {
  const [findValue, setFindValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const isFirstRender = useRef(true);

  useEffect(() => {
    const getImages = () => {
      imagesAPI
        .fetchImages(findValue, pageNumber)
        .then(({ hits }) => {
          if (hits.length === 0) {
            setStatus('rejected');
            return;
          }
          if (hits.length < 12 || (hits.length !== 0 && hits.length < 12)) {
            setStatus('resolved');
            setImages(prevHits => [...prevHits, ...hits]);
            setShowBtn(false);
          } else {
            setStatus('resolved');
            setImages(prevHits => [...prevHits, ...hits]);
            setShowBtn(true);
          }
          if (pageNumber !== 1) {
            animateScroll.scrollToBottom({
              duration: 1000,
              delay: 10,
              smooth: 'linear',
            });
          }
        })
        .catch(error => {
          setError(error);
          setStatus('rejected');
        });
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (findValue) {
      setStatus('pending');
      getImages();
    }
  }, [findValue, pageNumber]);

  const handleFormSubmit = findValue => {
    setFindValue(findValue);
    setPageNumber(1);
    setImages([]);
  };
  const onLoadMore = () => {
    setPageNumber(pageNumber => pageNumber + 1);
  };

  const onOpenModal = url => {
    setLargeImageURL(url);
    modalToggle();
  };

  const modalToggle = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        status={status}
        error={error}
        images={images}
        onClick={onOpenModal}
        onLoadMore={onLoadMore}
      />
      {showModal && <Modal src={largeImageURL} onCloseModal={modalToggle} />}
      {showBtn && <Button onLoadMore={onLoadMore} />}
      {setStatus === 'idle' && <div className="Info">The gallery is empty</div>}
      {setStatus === 'pending' && <Loader />}
      {setStatus === 'rejected' && <div className="Info">We cant find it</div>}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </div>
  );
}
