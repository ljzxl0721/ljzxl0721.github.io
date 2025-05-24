import React from 'react';

export default function BackgroundWrapper({ children }) {
  return (
    <>
      <div className="background-container">
        <iframe
          src="/xuanku/Swarm Background.html"
          title="Background Effect"
          aria-hidden="true"
        />
      </div>
      {children}
    </>
  );
} 