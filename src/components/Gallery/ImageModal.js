import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './ImageModal.module.css';

export default function ImageModal({ image, onClose }) {
  const imageUrl = useBaseUrl(image.image);
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <img src={imageUrl} alt={image.title} className={styles.fullImage} />
        <div className={styles.imageInfo}>
          <h2>{image.title}</h2>
          <p>{image.description}</p>
          <div className={styles.metadata}>
            <span>尺寸: {image.dimensions}</span>
            <span>大小: {image.size}</span>
          </div>
          <div className={styles.tags}>
            {image.tags && image.tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <a href={imageUrl} download className={styles.downloadButton}>
            下载图片
          </a>
        </div>
      </div>
    </div>
  );
} 