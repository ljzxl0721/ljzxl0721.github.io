import React, { useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import './styles.css';

export default function BackgroundEffect() {
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    let container = null;
    let iframe = null;

    const initBackground = () => {
      // Create container
      container = document.createElement('div');
      container.className = 'background-container';
      document.body.prepend(container);

      // Create iframe
      iframe = document.createElement('iframe');
      iframe.className = 'background-iframe';
      iframe.src = '/xuanku/Swarm Background.html';
      container.appendChild(iframe);
    };

    initBackground();

    return () => {
      if (iframe) {
        iframe.remove();
      }
      if (container) {
        container.remove();
      }
    };
  }, []);

  return null;
} 