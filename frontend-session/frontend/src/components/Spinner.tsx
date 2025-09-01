import React from 'react';

interface SpinnerProps {
  message?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message = 'Loading users...' }) => {
  return <p>{message}</p>;
};

export default Spinner;
