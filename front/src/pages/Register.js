import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Footer from '../components/Footer';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 

    window.addEventListener('resize', handleResize); 

    return () => {
      window.removeEventListener('resize', handleResize); 
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, city, state, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!city) newErrors.city = 'Cidade é obrigatória';
    if (!state) newErrors.state = 'Estado é obrigatório';
    if (!email) newErrors.email = 'Email é obrigatório';
    if (!password) newErrors.password = 'Senha é obrigatória';
    if (password && password.length < 6) newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { name, city, state, email, password, confirmPassword } = formData;

    try {
      const response = await fetch('https://educatech-backend-7yo9.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          city,
          state,
          email,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.contentContainer}>
        {!isMobile && (
          <div style={styles.imageContainer}>
            <img
              src={require('../assets/cadastro.png')}
              alt="Educatech"
              style={styles.image}
            />
          </div>
        )}
        <div style={styles.formContainer}>
          <h2 style={styles.title}>BEM-VINDO À EDUCATECH!</h2>
          <p style={styles.subtitle}>Insira seus dados para criar sua conta:</p>

          <form style={styles.form} onSubmit={handleConfirm}>
            <label style={styles.label}>Nome Completo</label>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome aqui"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <p style={styles.errorText}>{errors.name}</p>}

            <label style={styles.label}>Cidade</label>
            <input
              type="text"
              name="city"
              placeholder="Digite sua cidade aqui"
              value={formData.city}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.city && <p style={styles.errorText}>{errors.city}</p>}

            <label style={styles.label}>Estado</label>
            <input
              type="text"
              name="state"
              placeholder="Digite seu estado aqui"
              value={formData.state}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.state && <p style={styles.errorText}>{errors.state}</p>}

            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email aqui"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}

            <label style={styles.label}>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha aqui"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && <p style={styles.errorText}>{errors.password}</p>}

            <label style={styles.label}>Confirme sua senha</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Digite novamente sua senha aqui"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}

            <div style={styles.containerButton}>
              <Button
                text="Confirmar"
                style={styles.confirmButton}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    backgroundColor: '#D9633F',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    margin: '0',
    padding: '0',
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '1200px',
    marginTop: '50px',
    padding: '0 15px',
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  image: {
    borderRadius: '20%',
    width: '100%',
    maxWidth: '400px',
    height: 'auto',
  },
  formContainer: {
    flex: 1,
    textAlign: 'left',
    paddingLeft: '50px',
    paddingRight: '50px',
    width: '100%',
    maxWidth: '500px',
    boxSizing: 'border-box',  
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#FDF4D7',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: '400',
    marginBottom: '20px',
    color: '#FDF4D7',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '18px',
    marginBottom: '8px',
    color: '#FDF4D7',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '2px solid #FDF4D7',
    backgroundColor: 'transparent',
    color: '#FDF4D7',
    width: '100%',  
    boxSizing: 'border-box',  
  },
  errorText: {
    color: '#ff0000',
    fontSize: '18px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
  containerButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  
  '@media (max-width: 768px)': {
    contentContainer: {
      padding: '0',  
    },
    formContainer: {
      paddingLeft: '15px',  
      paddingRight: '15px', 
    },
    title: {
      fontSize: '28px',
    },
    subtitle: {
      fontSize: '16px',
    },
    input: {
      fontSize: '14px',
    },
  },
};


export default Register;
