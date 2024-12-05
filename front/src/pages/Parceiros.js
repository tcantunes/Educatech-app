import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PartnersPage = () => {
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <h1 style={styles.title}>Parceiros</h1>
        <p style={styles.text}>Em breve</p>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundColor: '#D9633F',
    color: '#FDF4D7',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '24px',
  },
};

export default PartnersPage;
