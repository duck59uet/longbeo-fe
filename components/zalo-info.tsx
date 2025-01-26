import React from 'react';

export default function ZaloConnect() {
  return (
    <a
        href="https://zalo.me/0976836223"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px', // Di chuyển icon sang bên trái
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
