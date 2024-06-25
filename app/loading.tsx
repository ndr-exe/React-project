'use client';
import React, { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`;
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={loaderContainer} className="dark:bg-black bg:white">
      <div style={spinner}></div>
    </div>
  );
};

const loaderContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  //   backgroundColor: '#f8f9fa',
};

const spinner = {
  width: '50px',
  height: '50px',
  border: '8px solid #f3f3f3',
  borderTop: '8px solid #ff8c00',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

export default Loading;
