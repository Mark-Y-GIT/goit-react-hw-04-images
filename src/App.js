import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pixabayFetchData from 'services/api/pixabayApi';
import ImageGallery from 'components/ImageGallery';
import BootAnimation from './components/BootAnimation';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import s from './App.module.css';

function App() {
  const [pictureName, setPictureName] = useState('');
  const [pictureData, setPictureData] = useState([]);
  const [pictureRequestPage, setPictureRequestPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!pictureName) {
      return;
    }
    setStatus('pending');

    if (pictureName)
      pixabayFetchData(pictureName, pictureRequestPage)
        .then(data => {
          if (data.length) {
            setPictureData(prevState => [...prevState, ...data]);

            setStatus('resolved');
          } else {
            setError(`No data on request ${pictureName}`);
            setStatus('rejected');
          }
        })
        .then(() => smoothScrolling())
        .catch(error => {
          setStatus('rejected');
          setError(error.message);
        });
  }, [pictureName, pictureRequestPage]);

  const getPictureName = inputValue => {
    if (inputValue === pictureName) {
      toast('Same request, try something else :)');
      return;
    }
    setPictureName(inputValue);
    setPictureData([]);
    setPictureRequestPage(1);
  };

  const moreImages = () => setPictureRequestPage(prevState => prevState + 1);

  const smoothScrolling = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={getPictureName} />
      {status === 'rejected' && <h1 className={s.Error}>{error}</h1>}
      <ImageGallery images={pictureData} />
      {status === 'pending' && <BootAnimation />}
      {status === 'resolved' && <Button loadMoreImages={moreImages} />}
      <ToastContainer />
    </div>
  );
}

export default App;
