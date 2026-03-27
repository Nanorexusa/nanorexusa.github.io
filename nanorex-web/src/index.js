import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 여기서 CSS를 불러와야 합니다
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);