import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import image from '../assets/login.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "../components/LoadingSpinner"; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userData = { email, password };

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            setIsLoading(false);

            if (response.ok) {
                localStorage.setItem('token', data.token);
                toast.success('Login bem-sucedido!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => navigate('/cursos')
                });
            } else {
                toast.error(data.message || 'Erro ao fazer login', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao fazer login:', error);
            toast.error('Erro no servidor', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        setIsLoading(true);
        
        try {
            const googleToken = credentialResponse.credential;
            const response = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: googleToken }),
            });
    
            const data = await response.json();
            setIsLoading(false);
            if (response.ok) {
                localStorage.setItem('token', data.token);
                toast.success('Login com Google bem-sucedido!', {
                    onClose: () => navigate('/cursos'),
                });
            } else {
                toast.error(data.message || 'Erro ao fazer login com Google');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao fazer login com Google:', error);
            toast.error('Erro no servidor');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '100vh',
            backgroundColor: '#D9633F',
        },
        contentContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px',
            maxWidth: '1200px',
            margin: '0 auto',
            flex: 1,
            gap: '40px',
            flexDirection: isMobile ? 'column' : 'row',
        },
        imageContainer: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            display: isMobile ? 'none' : 'flex', 
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
        color: '#FDF4D7',
        maxWidth: '500px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        },
        title: {
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        subtitle: {
            fontSize: '16px',
            fontWeight: '400',
            marginBottom: '30px',
        },
        formGroup: {
            marginBottom: '20px',
        },
        label: {
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '5px',
            display: 'block',
        },
        input: {
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '2px solid #F4D19B',
            backgroundColor: '#D9633F',
            color: '#FDF4D7',
            marginBottom: '20px',
        },
        containerButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        registerText: {
            fontSize: '14px',
            fontWeight: '400',
            marginTop: '20px',
            marginBottom: '10px',
            color: '#FDF4D7',
        },
        registerButton: {
            padding: '15px 10px',
        },
        loadingSpinner: {
            margin: '20px 0',  
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            height: '50px',
        },
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.contentContainer}>
                <div style={styles.imageContainer}>
                    <img src={image} alt="Casal sorrindo" style={styles.image} />
                </div>
                <div style={styles.formContainer}>
                    <h1 style={styles.title}>BEM-VINDO DE VOLTA!</h1>
                    <p style={styles.subtitle}>INSIRA SUAS INFORMAÇÕES PARA CONTINUAR</p>

                    <form onSubmit={handleLogin}>
                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="DIGITE SEU EMAIL AQUI"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="password" style={styles.label}>SENHA</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="DIGITE SUA SENHA AQUI"
                                style={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div style={styles.containerButton}>
                            {isLoading ? (
                                <LoadingSpinner 
                                    type="spin" 
                                    color="#FDF4D7" 
                                    height={50} 
                                    width={50} 
                                    style={styles.loadingSpinner} 
                                />
                            ) : (
                                <Button text="ENTRAR" className="loginButton" type="submit" />
                            )}
                            <p style={styles.registerText}>OU</p>
                            <GoogleLogin
                                onSuccess={handleGoogleLoginSuccess}
                                onError={() => console.log('Login failed')}
                                useOneTap
                            />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Login;
