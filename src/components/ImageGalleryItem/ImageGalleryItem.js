import s from './ImageGalleryItem.module.css';
import { useState } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';

function ImageGalleryItem({ src, alt, largeImageUrl }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        onClick={toggleModal}
        className={s['ImageGalleryItem-image']}
      />
      {isModalOpen && (
        <Modal onClose={toggleModal} src={largeImageUrl} alt={alt} />
      )}
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  alt: PropTypes.string,
  largeImageUrl: PropTypes.string,
  src: PropTypes.string,
};
