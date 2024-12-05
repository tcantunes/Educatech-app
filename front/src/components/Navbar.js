import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaArrowLeft } from 'react-icons/fa';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch('https://educatech-backend-7yo9.onrender.com/api/auth/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.email === 'educatech@gmail.com');
          } else {
            console.error('Erro ao buscar os dados do usuário');
          }
        } catch (error) {
          console.error('Erro na requisição da API:', error);
        }
      };
      
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);  
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={styles.navbar}>
      {isLoggedIn && (
        <FaArrowLeft
          style={styles.backArrow}
          onClick={() => navigate(-1)}
        />
      )}
      <div style={styles.logo} onClick={() => navigate('/')}>EDUCATECH</div>
      <div style={styles.buttonContainer}>
        {isLoggedIn ? (
          <div style={styles.userContainer} ref={menuRef}>
            <FaUser style={styles.userIcon} onClick={toggleMenu} />
            {isMenuOpen && (
              <div style={styles.userMenu(isMenuOpen)}>
                <p onClick={() => navigate('/cursos')} style={{ ...styles.menuItem, ':hover': styles.menuItemHover }}>
                  Cursos
                </p>
                {isAdmin && (
                  <p onClick={() => navigate('/admin-page')} style={{ ...styles.menuItem, ':hover': styles.menuItemHover }}>
                    Adicionar Vídeos
                  </p>
                )}
                <p onClick={() => navigate('/profile')} style={{ ...styles.menuItem, ':hover': styles.menuItemHover }}>
                  Meu Perfil
                </p>
                <p onClick={handleLogout} style={{ ...styles.menuItem, ':hover': styles.menuItemHover }}>
                  Sair
                </p>
              </div>
            )}
          </div>
        ) : (
          <Button text="Nos Contate" onClick={() => navigate('/contact')} style={styles.contactButton}/>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    width: '100%',
    maxWidth: '100vw',
    height: '75px',
    backgroundColor: '#F4D19B',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 10,
    boxSizing: 'border-box',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', 
  },
  backArrow: {
    fontSize: '24px',
    color: '#4C3327',
    cursor: 'pointer',
    marginRight: '10px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4C3327',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    marginRight: 'auto',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#83555e',
    fontSize: '20px',
    marginLeft: '20px',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  userIcon: {
    fontSize: '24px',
    color: '#4C3327',
    marginRight: '10px',
    transition: 'transform 0.3s ease',
    position: 'relative', 
  },
  userMenu: (isMenuOpen) => ({
    position: 'absolute',
    top: '45px', 
    left: '50%',
    transform: 'translateX(-95%)', 
    backgroundColor: '#FFFFFF',
    padding: '15px 20px',
    borderRadius: '12px', 
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)', 
    display: 'flex',
    flexDirection: 'column',
    zIndex: 20,
    width: '200px', 
    opacity: isMenuOpen ? 1 : 0,
    visibility: isMenuOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    fontFamily: "'Poppins', sans-serif", 
  }),
  menuItem: {
    padding: '12px 10px', 
    cursor: 'pointer',
    color: '#333333', 
    textAlign: 'center',
    fontSize: '16px', 
    fontWeight: 'bold', 
    borderRadius: '8px', 
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  '@media (max-width: 768px)': {
    navbar: {
      flexDirection: 'column',
      height: 'auto',
      padding: '10px 20px',
    },
    logo: {
      fontSize: '15px',
      marginBottom: '10px',
    },
    navLinks: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    link: {
      fontSize: '15px',
      marginLeft: '0',
      marginTop: '5px',
    },
    backArrow: {
      fontSize: '15px',
    },
  },
  '@media (max-width: 480px)': {
    navbar: {
      padding: '10px 15px',
    },
    logo: {
      fontSize: '15px',
      marginBottom: '5px',
    },
    userIcon: {
      fontSize: '15px',
    },
    userMenu: (isMenuOpen) => ({
      width: '180px', 
      left: '50%',
      transform: 'translateX(-95%)',
    }),
  },
};

export default Navbar;