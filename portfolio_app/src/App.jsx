// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

//////////////// Importar Bootstrap ////////////////
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.js";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
//////////////// Importar Bootstrap ////////////////

// Importar componentes
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//////////////// Importar Hojas de estilos ////////////////
import './styles/styles.scss';
import "./styles/TaskList.css";
//////////////// Importar Hojas de estilos ////////////////

// Traer los componentes de las páginas
import EasterEgg from "./components/EasterEgg";
import NavBar from "./components/NavBar";
import NavBarWelcome from "./components/NavBarWelcome";
import TaskList from "./components/TaskList";
import Home from "./components/Home"; 
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from './components/Footer';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

import Register from './components/Register';
import Welcome from './components/Welcome';
import Login from './components/Login';

import Profile from './components/Profile';
import ProfilePreview from './components/ProfilePreview';
import Education from './components/Education';


// Componente principal de la aplicación
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [showSuccess, setShowSuccess] = useState(false);
  const isWelcomePage = window.location.pathname === '/welcome' || window.location.pathname === '/login' || window.location.pathname === '/register' || window.location.pathname === '' || window.location.pathname === '/' || window.location.pathname === '/profilePreview' || window.location.pathname === '/easterEgg';


  // Verificar el token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      // Si no hay token, establece el error y redirige a /login de no estar allí :p
      if (!isWelcomePage ) {
        setAuthError('No autorizado. Por favor, inicia sesión.');
      }
    }
  }, []);

  
  // Función para manejar el inicio de sesión (llamada desde el componente Login)
  const handleLogin = () => {
    setIsLoggedIn(true);
    // console.log("hola estoy autorizado");
    setAuthError(''); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthError('');
  };


  const clearError = () => {
    setAuthError(''); 
  };


  const clearSucc = () => {
    setShowSuccess(false);  
  };

  // Renderización del Navbar dependiendo del contexto y autenticación
  const renderNavBar = () => {
    const token = localStorage.getItem('authToken');
    
    if (isWelcomePage && !token) {
      return <NavBarWelcome/>;
    } else 
      return <NavBar onLogin={handleLogin} setLoading={setLoading} onLogout={handleLogout}/>;
    
  };
  

  ////////////////////////////////////////////////////////////////////////
  // Renderizado de la página actual junto con el NavBar y el Footer
  return (
    <BrowserRouter>

    <div className="page-layout">
            {authError && (
                <div className="alert alert-danger" style={{ position: 'absolute', top: '70px', zIndex: 100000, left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={clearError}>
                {authError}
                </div>
            )}

          {showSuccess && (
                <div className="alert alert-success" style={{ position: 'absolute', top: '70px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}  onClick={clearSucc}>
                Cerrando Sesión...
                </div>
            )}
        {/* Pantalla de carga global */}
        {loading && (
          <div style={{ position: 'fixed', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000000, left: 0, top: 0, width: '100%', height: '100%'}}>
            {/* <div className="loader"> */}
            <Spinner animation="border" variant="light" size="lg" />
          </div>
        )}
      {/* //////////// Navbar //////////// */}
      <div className="d-flex flex-column"><br></br>
        {renderNavBar()}
      </div>

      {/* //////////// Página actual //////////// */}
      <main className="flex-grow-1 mt-5 ">
        <Routes>
          {/* Rutas públicas (no requieren autenticación) */}
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login onLogin={handleLogin} setAuthError={setAuthError} setCurrentPage={setCurrentPage} setLoading={setLoading}/>} />
          <Route path="/register" element={<Register setAuthError={setAuthError} setLoading={setLoading} />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/easterEgg" element={<EasterEgg />} />
          <Route path="/profilePreview" element={<ProfilePreview setLoading={setLoading} /> } />

          {/* Rutas protegidas (requieren autenticación) obsoleto :p */}
          {/* <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/experience" element={isLoggedIn ? <Experience /> : <Navigate to="/login" />} />
          <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isLoggedIn ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/blog" element={isLoggedIn ? <Blog /> : <Navigate to="/login" />} /> */}
          <Route path="/home" element={<Home setLoading={setLoading} /> } />
          <Route path="/experience" element={<Experience setLoading={setLoading} /> } />
          <Route path="/profile" element={<Profile setLoading={setLoading} /> } />
          <Route path="/education" element={<Education setLoading={setLoading} /> } />
          <Route path="/contact" element={<Contact setLoading={setLoading} /> } />
          {/* <Route path="/tasks" element={<TaskList /> } /> */}

          {/* Ruta para manejar cualquier otra ruta no definida */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </main>

      <div className="flex-fill"></div>

      {/* //////////// Footer //////////// */}
      <br></br><br></br><br></br>
        <Footer setCurrentPage={setCurrentPage}/>
    </div>
    </BrowserRouter>
  );
  ////////////////////////////////////////////////////////////////////////
}

export default App;
