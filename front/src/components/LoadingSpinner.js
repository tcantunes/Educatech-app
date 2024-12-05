import React from "react";

const LoadingSpinner = ({ type, color, height, width, style }) => {
    return (
        <div style={{ ...style, borderRadius: '50%', border: `5px solid ${color}`, borderTop: `5px solid #fff`, width, height, animation: "spin 1s linear infinite" }}>
        </div>
    );
};

const styles = {
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    }
  },
};

export default LoadingSpinner;
