import React from 'react';

const Button = ({ text, onClick, style }) => {
  return (
    <button onClick={onClick} style={{ ...defaultStyles.button, ...style }}>
      {text}
    </button>
  );
};

const defaultStyles = {
  button: {
    backgroundColor: '#d7bf5e',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    margin: '10px',
    borderRadius: '10px',
    color: '#83555e',
    fontWeight: 'bold',
    height: '48px',
    width: 'auto',
    minWidth: '120px', 
    maxWidth: '100%', 
  },
  '@media (max-width: 768px)': {
    button: {
      padding: '12px 24px', 
      fontSize: '10px', 
      width: 'auto', 
      minWidth: '100px', 
      margin: '5px',
    },
  },

  '@media (max-width: 480px)': {
    button: {
      fontSize: '10px', 
    },
  }
};

export default Button;

