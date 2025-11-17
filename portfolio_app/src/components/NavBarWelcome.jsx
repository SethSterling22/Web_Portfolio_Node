// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ClipboardList, User  } from 'lucide-react';

const NavBarWelcome = (  ) => {

    ///////////////////////////////////////////////////
    // Manejo de redireciones :)
    const navigate = useNavigate();
    const handleNavigation = (e, page) => {
        e.preventDefault();
        navigate(page);
    };
    ///////////////////////////////////////////////////

    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const [error, setError] = React.useState('');


    useEffect(() => {
        // Verifica si hay un token en localStorage al cargar el componente
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            // Si no hay token, redirige a login y establece un error
            // setError('No autorizado. Por favor, inicia sesión. sdsdvc');
            navigate('/login');
        } else {
            console.log("ok");
        }
    }, []);


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


    const clearError = () => {
        setError(''); 
    };

    return (

        // NavBar de la página de bienvenida
        <nav className="navbar navbar-dark bg-dark fixed-top navbar-expand-lg p-2">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse align-items-center justify-content-between" id="navbarToggler">
                <div className='d-flex' id='navWelcome'>
                    <a className="navbar-brand align-items-center d-flex" href="" onClick={(e) => handleNavigation(e, '/welcome')}>
                        <img src="https://aeryportfolio.wordpress.com/wp-content/uploads/2024/02/sin-titulo-1_mesa-de-trabajo-1-1-edited.png" width="45" height="45" className="d-inline-block align-top" alt="loguito"/>
                        Portafolio 3.0
                    </a>
                    
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
                        <li className="nav-item active">
                            <a className="nav-link" onClick={(e) => handleNavigation(e, '/welcome')} style={{ cursor: 'pointer' }}>
                                Principal
                            </a>
                        </li>
                    </ul>
                    
                </div>

                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 " >
                <li className="nav-item">
                        <a className="nav-link d-flex gap-2 align-items-center" onClick={(e) => handleNavigation(e, '/profilePreview')} style={{ cursor: 'pointer' }}>
                            <User size={20}/>Perfil
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link d-flex gap-2 align-items-center" onClick={(e) => handleNavigation(e, '/login')} style={{ cursor: 'pointer' }}>
                            <LogIn size={20}/>Iniciar Sesión
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link d-flex gap-2 align-items-center" onClick={(e) => handleNavigation(e, '/register')} style={{ cursor: 'pointer' }}>
                            <ClipboardList size={20}/>Registrarse
                        </a>
                    </li>
                </ul>
            </div>
            {error && (
                <div
                className="alert alert-danger"
                style={{ position: 'absolute', top: '70px', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }}
                onClick={clearError}
                >
                {error}
                </div>
            )}
        </nav>

    );
    
};

export default NavBarWelcome;
