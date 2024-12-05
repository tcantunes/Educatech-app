import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

const AdminVideos = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("computador");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/videos/${category}`);
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Erro ao carregar vídeos:", error);
      }
    };

    fetchVideos();
  }, [category]);

  const handleAddVideo = async () => {
    const newVideo = { title, description, videoUrl, category };

    try {
      const response = await fetch("http://localhost:8080/api/videos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });

      if (response.ok) {
        const addedVideo = await response.json();
        setVideos((prevVideos) => [...prevVideos, addedVideo]);
        setTitle("");
        setDescription("");
        setVideoUrl("");
      } else {
        console.error("Erro ao adicionar vídeo.");
      }
    } catch (error) {
      console.error("Erro na requisição de adição:", error);
    }
  };

  const handleRemoveVideo = async (videoId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/videos/${videoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setVideos(videos.filter((video) => video._id !== videoId));
      } else {
        console.error("Erro ao remover vídeo.");
      }
    } catch (error) {
      console.error("Erro na requisição de remoção:", error);
    }
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <h1 style={styles.title}>Admin - Adicionar Novo Vídeo</h1>
      <div style={styles.contentContainer}>
        <div style={styles.form}>
          <label style={styles.label}>
            Título do Vídeo:
            <input
              style={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label style={styles.label}>
            Descrição:
            <input
              style={styles.textarea}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label style={styles.label}>
            URL do Vídeo:
            <input
              style={styles.input}
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </label>
          <label style={styles.label}>
            Categoria:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={styles.select}
            >
              <option value="computador">Computador</option>
              <option value="televisao">Televisão</option>
              <option value="celular">Celular</option>
            </select>
          </label>
          <Button onClick={handleAddVideo} text="Adicionar" />
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
    width: '100%',
    maxWidth: '100vw', 
    overflowX: 'hidden', 
    backgroundColor: '#D9633F',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    flex: 1,
    color: "#FDF4D7",
    padding: '20px',
    
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginTop: "130px",
    textAlign: "center",
    color: "#FDF4D7",
  },
  form: {
    flex: 1,
    textAlign: 'left',
    color: '#FDF4D7',
    padding: '20px',
    maxWidth: '600px',
    borderRadius: '10px',
    boxSizing: 'border-box',
    width: '100%',
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
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '2px solid #F4D19B',
    backgroundColor: '#D9633F',
    color: '#FDF4D7',
    height: '150px',
    resize: 'none',
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #4C3327",
    width: '100%',
  },
  '@media (max-width: 768px)': {
    title: {
      fontSize: '24px',
      marginTop: '50px',
    },
    contentContainer: {
      flexDirection: 'column',
      padding: '10px',
    },
    form: {
      padding: '15px',
    },
  },
};

export default AdminVideos;
