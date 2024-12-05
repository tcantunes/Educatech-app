import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const VideoPage = () => {
  const [userName, setUserName] = useState('');
  const [videos, setVideos] = useState([]);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const { curso } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const fetchUserName = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/auth/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserName(data.name);
          } else {
            console.error('Erro ao buscar o nome do usuário');
          }
        } catch (error) {
          console.error('Erro na requisição da API:', error);
        }
      };

      fetchUserName();
    }

    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/videos/${curso}`);

        if (response.ok) {
          const data = await response.json();
          setVideos(data);
        } else {
          console.error('Erro ao buscar os vídeos');
        }
      } catch (error) {
        console.error('Erro na requisição da API:', error);
      }
    };

    fetchVideos();

    const tokenUser = localStorage.getItem('token');
    if (tokenUser) {
      const userEmail = JSON.parse(atob(tokenUser.split('.')[1])).email;
      const storedWatchedVideos = JSON.parse(localStorage.getItem(`watchedVideos_${userEmail}`)) || [];
      setWatchedVideos(storedWatchedVideos);
    }

  }, [curso]);

  const handleRemoveVideo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setVideos(videos.filter((video) => video._id !== id));
      } else {
        console.error('Erro ao excluir o vídeo');
      }
    } catch (error) {
      console.error('Erro na requisição da API:', error);
    }
  };

  const handleVideoClick = (video) => {
    const tokenUser = localStorage.getItem('token');
    if (tokenUser) {
      let watchedVideos = JSON.parse(localStorage.getItem(`watchedVideos_${JSON.parse(atob(tokenUser.split('.')[1])).email}`)) || [];
      const videoAlreadyWatched = watchedVideos.some(v => v._id === video._id);
  
      if (!videoAlreadyWatched) {
        watchedVideos.push(video);
        localStorage.setItem(`watchedVideos_${JSON.parse(atob(tokenUser.split('.')[1])).email}`, JSON.stringify(watchedVideos));
        setWatchedVideos(watchedVideos);
        window.dispatchEvent(new Event('watchedVideosUpdated'));
        console.log('Vídeo marcado como assistido:', video.title);
      } else {
        console.log('Vídeo já assistido:', video.title);
      }
    }
  };
  

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.contentContainer}>
        <h1 style={styles.title}>OLÁ, {userName.toUpperCase()}!</h1>
        <p style={styles.subtitle}>ESSES SÃO OS CURSOS SOBRE {curso.toUpperCase()}:</p>

        <div style={styles.videoGrid}>
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video._id} style={styles.card}>
                <iframe
                  style={styles.video}
                  src={video.videoUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onClick={() => handleVideoClick(video)} 
                />
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{video.title}</h2>
                  <p style={styles.cardDescription}>{video.description}</p>

                  <button onClick={() => handleRemoveVideo(video._id)} style={styles.deleteButton}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noVideos}>Não há vídeos disponíveis para essa categoria.</p>
          )}
        </div>
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
  },
  contentContainer: {
    padding: '50px', 
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#FDF4D7',
  },
  title: {
    fontSize: '24px', 
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop: '40px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '16px', 
    fontWeight: '400',
    marginBottom: '20px',
    textAlign: 'center',
  },
  videoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '15px',
  },
  card: {
    backgroundColor: '#FDF4D7',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  video: {
    width: '100%',
    height: '180px', 
  },
  cardContent: {
    padding: '10px',
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#4C3327',
    marginBottom: '5px',
  },
  cardDescription: {
    fontSize: '12px',
    color: '#4C3327',
    marginBottom: '10px',
  },
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#4C3327',
  },
  noVideos: {
    color: '#4C3327',
    fontSize: '16px',
    fontStyle: 'italic',
    textAlign: 'center',
  },

 
  '@media (max-width: 768px)': {
    contentContainer: {
      padding: '15px',
    },
    title: {
      fontSize: '20px',
    },
    subtitle: {
      fontSize: '14px',
    },
    videoGrid: {
      gap: '10px',
    },
    card: {
      borderRadius: '8px',
    },
    video: {
      height: '160px',
    },
  },

  '@media (max-width: 480px)': {
    contentContainer: {
      padding: '10px', 
    },
    title: {
      fontSize: '18px',
    },
    subtitle: {
      fontSize: '12px',
    },
    cardTitle: {
      fontSize: '12px',
    },
    cardDescription: {
      fontSize: '10px',
    },
    video: {
      height: '140px', 
    },
  },

  '@media (max-width: 360px)': {
    videoGrid: {
      gridTemplateColumns: '1fr', 
    },
    card: {
      borderRadius: '5px',
    },
    video: {
      height: '120px', 
    },
    title: {
      fontSize: '16px',
    },
    subtitle: {
      fontSize: '10px',
    },
  },
};



export default VideoPage;
