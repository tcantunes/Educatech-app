import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSend = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
        };

        const serviceID = 'service_2hdvpwh';
        const templateID = 'template_hxtk4kr';
        const publicKey = 'jkeMcoURed_lEbOOC';

        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                toast.success('Mensagem enviada com sucesso!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setName('');
                setEmail('');
                setMessage('');
            })
            .catch((err) => {
                toast.error('Erro ao enviar mensagem', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.error('Erro ao enviar e-mail:', err);
            });
    };

    return (
        <div style={styles.container}>
            <Navbar />
            <div style={styles.contentContainer}>
                <div style={styles.formContainer}>
                    <h1 style={styles.title}>ENTRE EM CONTATO</h1>
                    <p style={styles.subtitle}>ENVIE SUA MENSAGEM PARA NÓS</p>

                    <form onSubmit={handleSend}>
                        <div style={styles.formGroup}>
                            <label htmlFor="name" style={styles.label}>NOME</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="DIGITE SEU NOME"
                                style={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="email" style={styles.label}>EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="DIGITE SEU EMAIL"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label htmlFor="message" style={styles.label}>MENSAGEM</label>
                            <textarea
                                id="message"
                                placeholder="DIGITE SUA MENSAGEM"
                                style={styles.textarea}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <div style={styles.containerButton}>
                            <Button text="ENVIAR" style={styles.sendButton} type="submit" />
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
            <ToastContainer />
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
    },
    contentContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5vw',
        maxWidth: '1200px',
        margin: '0 auto',
        flex: 1,
    },
    formContainer: {
        flex: 1,
        textAlign: 'left',
        color: '#FDF4D7',
        padding: '5vw',
        maxWidth: '600px',
        borderRadius: '10px',
        width: '100%',
    },
    title: {
        fontSize: '2vw',
        fontWeight: 'bold',
        marginBottom: '1vw',
    },
    subtitle: {
        fontSize: '1vw',
        fontWeight: '400',
        marginBottom: '1vw',
    },
    formGroup: {
        marginBottom: '2vw',
    },
    label: {
        fontSize: '1.5vw',
        fontWeight: 'bold',
        marginBottom: '0.5vw',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '1vw',
        fontSize: '1.5vw',
        borderRadius: '5px',
        border: '2px solid #F4D19B',
        backgroundColor: '#D9633F',
        color: '#FDF4D7',
        marginBottom: '2vw',
    },
    textarea: {
        width: '100%',
        padding: '1vw',
        fontSize: '1.5vw',
        borderRadius: '5px',
        border: '2px solid #F4D19B',
        backgroundColor: '#D9633F',
        color: '#FDF4D7',
        height: '20vh',
        resize: 'none',
    },
    containerButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        padding: '1vw 1vw',
    },
};

const mediaQueries = {
    '@media(max-width: 768px)': {
        title: {
            fontSize: '5vw',
        },
        subtitle: {
            fontSize: '3vw',
        },
        input: {
            padding: '3vw',
            fontSize: '3vw',
        },
        textarea: {
            padding: '3vw',
            fontSize: '3vw',
        },
    },
    '@media(max-width: 480px)': {
        formContainer: {
            padding: '10px',
        },
        title: {
            fontSize: '6vw',
        },
        subtitle: {
            fontSize: '4vw',
        },
        input: {
            padding: '4vw',
            fontSize: '4vw',
        },
        textarea: {
            padding: '4vw',
            fontSize: '4vw',
        },
        sendButton: {
            padding: '4vw 2vw',
        },
    },
};

export default ContactPage;
