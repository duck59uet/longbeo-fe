'use client';

import React from 'react';

export default function ZaloConnect() {
  return (
    <a
      href="https://zalo.me/0976836223"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '70px', // Changed from 20px to 30px to move it 10px higher
        right: '20px',
        zIndex: 1000
      }}
    >
      <img
        src="/zalo.webp"
        alt="Zalo Support"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          cursor: 'pointer'
        }}
      />
    </a>
  );
}
