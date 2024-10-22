'use client'

import React, { useState, useEffect } from 'react';
import styles from './imagesGallery.module.css'

export const ImagesGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const openImage = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    openImage(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    openImage(prevIndex);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 200
    ) {
      // Tutaj możesz załadować kolejne obrazy w galerii
      setIsLoading(true);
      setTimeout(() => {
        // Symulacja ładowania nowych obrazków
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.gallery}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={styles.galleryItem}
          onClick={() => openImage(index)}
        >
          <img src={`https://strapi-147044-0.cloudclusters.net${image?.attributes?.url}`} alt={`Image ${index}`} />
        </div>
      ))}
      {selectedImage && (
        <div className={styles.modal}>
          <img src={`https://strapi-147044-0.cloudclusters.net${selectedImage?.attributes?.url}`} alt={`Image ${currentIndex}`} />
          <span className={styles.close} onClick={closeImage}>
            X
          </span>
          <span className={styles.index}>{currentIndex + 1}/{images.length}</span>
          <div className={styles.prev} onClick={handlePrev}>
            &lt;
          </div>
          <div className={styles.next} onClick={handleNext}>
            &gt;
          </div>
        </div>
      )}
      {isLoading && <div className={styles.loading}>Ładowanie...</div>}
    </div>
  );
};
