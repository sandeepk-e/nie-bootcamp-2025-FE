import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', message = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className={`spinner spinner--${size}`}>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
        <div className="spinner-circle"></div>
      </div>
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );
};

export default Spinner;
