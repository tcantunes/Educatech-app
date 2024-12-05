import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cursos from './pages/Cursos';
import VideoPage from './pages/Videos';
import UserProfile from './pages/PaginaUsuario';
import Contact from './pages/Contato';
import VerifyLogin from './pages/VerifyLogin'; 
import ProtectedRoute from './components/ProtectedRoute';
import PartnersPage from './pages/Parceiros';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="1039504549165-8m5t7g59mlh4m21cgkpq8qt8p9kg099q.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-login" element={<VerifyLogin />} />
          <Route
            path="/cursos"
            element={
              <ProtectedRoute>
                <Cursos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos/:curso"
            element={
              <ProtectedRoute>
                <VideoPage />
              </ProtectedRoute>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/parceiros" element={<PartnersPage />} />
          <Route path="/admin-page" element={<AdminPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
