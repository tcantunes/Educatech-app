import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const VerifyLogin = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Você precisa estar logado para acessar esta página</h1>
      <Button text="Ir para Login" onClick={() => navigate('/login')} style={styles.button}/>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#F4D19B',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#D9633F',
    color: '#FDF4D7',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default VerifyLogin;
