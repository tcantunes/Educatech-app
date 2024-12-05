import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEdit } from "react-icons/fa"; 
import LoadingSpinner from "../components/LoadingSpinner"; 

const UserProfile = () => {
  const [user, setUser] = useState({ name: "", email: "", watchedVideos: [] });
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const getWatchedVideos = () => {
    const watchedVideos = JSON.parse(localStorage.getItem("watchedVideos")) || [];
    return watchedVideos;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            const watchedVideosFromStorage = getWatchedVideos();
            setUser({ ...userData, watchedVideos: watchedVideosFromStorage });
          } else {
            console.error("Erro ao buscar perfil do usuário");
          }
        } catch (error) {
          console.error("Erro na requisição da API:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleWatchedVideosUpdate = () => {
      const watchedVideos = JSON.parse(localStorage.getItem("watchedVideos")) || [];
      setUser((prevState) => ({
        ...prevState,
        watchedVideos: watchedVideos,
      }));
    };
  
    window.addEventListener('watchedVideosUpdated', handleWatchedVideosUpdate);
  
    return () => {
      window.removeEventListener('watchedVideosUpdated', handleWatchedVideosUpdate);
    };
  }, []);

  const handleEditName = () => {
    setIsEditingName(true);
    setNewName(user.name);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setNewEmail(user.email);
  };

  const handleSaveName = () => {
    setUser((prevState) => ({
      ...prevState,
      name: newName,
    }));
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    setUser((prevState) => ({
      ...prevState,
      email: newEmail,
    }));
    setIsEditingEmail(false);
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        {loading ? (
          <LoadingSpinner
            type="spin" 
            color="#FDF4D7" 
            height={50} 
            width={50} 
            style={styles.loadingSpinner} 
          /> 
        ) : (
          <>
            <div style={styles.profileCard}>
              <h2 style={styles.heading}>Perfil do Usuário</h2>
              <div style={styles.profileSection}>
                <div style={styles.fieldContainer}>
                  <strong>Nome:</strong>
                  {isEditingName ? (
                    <div>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        style={styles.input}
                      />
                      <button
                        onClick={handleSaveName}
                        style={styles.saveButton}
                      >
                        Salvar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{user.name}</span>
                      <FaEdit
                        onClick={handleEditName}
                        style={styles.editIcon}
                      />
                    </div>
                  )}
                </div>
                <div style={styles.fieldContainer}>
                  <strong>Email:</strong>
                  {isEditingEmail ? (
                    <div>
                      <input
                        type="text"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        style={styles.input}
                      />
                      <button
                        onClick={handleSaveEmail}
                        style={styles.saveButton}
                      >
                        Salvar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span>{user.email}</span>
                      <FaEdit
                        onClick={handleEditEmail}
                        style={styles.editIcon}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};


const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "100vh",
      backgroundColor: "#D9633F",
      color: "#333",
      fontFamily: "Arial, sans-serif",
    },
    content: {
      margin: "20px auto",
      width: "80%",
      maxWidth: "900px",
      padding: "20px",
      position: "relative", 
    },
    profileCard: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginBottom: "30px",
      marginTop: "100px",
    },
  heading: {
    color: "#D9633F",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "600",
  },
  profileSection: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  fieldContainer: {
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    padding: "5px",
    marginRight: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  saveButton: {
    padding: "5px 10px",
    backgroundColor: "#D9633F",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editIcon: {
    cursor: "pointer",
    color: "#D9633F",
    fontSize: "20px",
    marginLeft: "20px",
  },
  watchedVideosSection: {
    marginTop: "30px",
    color: "#FDF4D7",
  },
  videoList: {
    listStyleType: "none",
    paddingLeft: "0",
  },
  videoItem: {
    backgroundColor: "#FDF4D7",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "background-color 0.3s",
    color: "#FDF4D7",
  },
  videoItemHover: {
    backgroundColor: "#D9633F",
    color: "#fff",
  },
  noVideosText: {
    color: "#FDF4D7",
    fontSize: "16px",
  },
  loadingSpinner: {
    position: "fixed", 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)", 
    zIndex: 9999, 
  },
};

export default UserProfile;
