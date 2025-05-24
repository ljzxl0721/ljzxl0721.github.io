import React, { useState, useRef } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ImageCard.module.css';

export default function ImageCard({ image, title, description, tags, dimensions, size, onImageClick }) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const imageUrl = useBaseUrl(image);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={styles.imageCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
    >
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={title} className={styles.image} loading="lazy" />
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <div className={styles.tags}>
              {tags && tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.metadata}>
              <span>{dimensions}</span>
              <span>{size}</span>
            </div>
            <button onClick={() => onImageClick({ image: imageUrl, title, description, tags, dimensions, size })} className={styles.viewButton}>
              点往
            </button>
            <a href={imageUrl} download className={styles.downloadButton}>
              <i className="fas fa-download"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 