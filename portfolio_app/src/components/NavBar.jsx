// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState, useEffect } from 'react';
import {  Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User, LogOut  } from 'lucide-react';

const Navbar = ({ onLogin, setLoading, onLogout }) => {

    ///////////////////////////////////////////////////
    // Manejo de redireciones :)
    const navigate = useNavigate();
    const handleNavigation = (e, page) => {
        e.preventDefault();
        navigate(page);
    };
    ///////////////////////////////////////////////////

    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const [error, setError] = useState(''); 
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false); 

    useEffect(() => {
        // Verifica si hay un token en localStorage al cargar el componente
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            // Si no hay token, redirige a login y establece un error
            setError('No autorizado. Por favor, inicia sesión.');
            onLogout();
            navigate('/login');
        } else {
            onLogin(); 
            console.log("Oki");
        }
    }, []);

    // Manejo de Cerrado de sesión
    const handleLogoutClick = (e) => {
        // Iniciar la pantalla de carga
        setLoading(true);
        e.preventDefault();
        setShowLogoutMessage(true); 
        setTimeout(() => {
            navigate('/login');
            onLogout();
        }, 1000); 
        setTimeout(() => {
            localStorage.removeItem('authToken');
            setLoading(false);
            setShowLogoutMessage(false);  
        }, 1500); 
    };

    ///////////////////////////////////////////////////////////////////////
    // todo esto para solamente cambiar un botoncito de lugar :D
    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= 992);
            const navWelcome = document.getElementById('navWelcome');
            if (navWelcome) {
                if (window.innerWidth < 992) {
                    navWelcome.classList.add('flex-column');
                } else {
                    navWelcome.classList.remove('flex-column');
                }
            }
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    ///////////////////////////////////////////////////////////////////////

    const clearError = () => {
        setError(''); 
    };

    const clearSucc = () => {
        setShowLogoutMessage(false);  
    };

    return (
    <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg p-2">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
            <div className="collapse navbar-collapse align-items-center justify-content-between" id="navbarToggler">
                <div className='d-flex' id='navWelcome'>
                    <a className="navbar-brand d-flex align-items-center" href="" onClick={(e) => handleNavigation(e, '/')}>
                        <img src="https://aeryportfolio.wordpress.com/wp-content/uploads/2024/02/sin-titulo-1_mesa-de-trabajo-1-1-edited.png" width="45" height="45" className="d-inline-block align-top" alt="loguito"/>
                        Portafolio 3.0
                    </a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active ">
                            <a className="nav-link" onClick={(e) => handleNavigation(e, '/home')}  style={{ cursor: 'pointer' }}>
                                Principal
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) => handleNavigation(e, '/experience')}  style={{ cursor: 'pointer' }}>
                            Experiencia
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) => handleNavigation(e, '/education')}  style={{ cursor: 'pointer' }}>
                            Educación
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) => handleNavigation(e, '/contact')}  style={{ cursor: 'pointer' }}>
                            Contacto
                            </a>
                        </li>
                    </ul>
                </div>

                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 " >
                    <li className="nav-item">
                            <a className="nav-link d-flex gap-2 align-items-center" onClick={(e) => handleNavigation(e, '/profile')}  style={{ cursor: 'pointer' }}>
                            <User size={20}/>Perfil
                            </a>
                        </li>
                    <li className="nav-item">
                        <a className="nav-link d-flex gap-2 align-items-center" onClick={() => setShowDeleteModal(true)} style={{ cursor: 'pointer' }}>
                            <LogOut size={20}/>Cerrar Sesión
                        </a>
                    </li>
                </ul>
            </div>
            {error && (
                <div className="alert alert-danger" style={{ position: 'absolute', top: '70px', zIndex: '99999', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={clearError}>
                {error}
                </div>
            )}

            {showLogoutMessage && (
                <div className="alert alert-success" style={{ position: 'absolute', zIndex: '99999',top: '70px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}  onClick={clearSucc}>
                Cerrando Sesión...
                </div>
            )}
                {/* Modal de Confirmación para Cerrar Sesión  */}
                <Modal style={{ position: 'absolute', zIndex: '9000'}} show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cerrar Sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Estás seguro de que desea Cerrar Sesión y volver a la página de Bienvenida?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="light" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                        <Button variant="danger" onClick={handleLogoutClick}>Cerrar Sesión</Button>
                    </Modal.Footer>
                </Modal>
        </nav>


    );
};


export default Navbar;
