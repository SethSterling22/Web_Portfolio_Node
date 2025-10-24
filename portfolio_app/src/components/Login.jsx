// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState } from 'react';
import api from '../services/api';
import { Card, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";

// Verificación de Email
import { EMAIL_REGEX } from '../constants/constants.jsx';


const Login = ({ onLogin, setCurrentPage, setAuthError, setLoading }) => {

    ///////////////////////////////////////////////////
    // Manejo de redireciones :)
    const navigate = useNavigate();
    
    const handleNavigation = (e, page) => {
        e.preventDefault();
        navigate(page);
    };
    ///////////////////////////////////////////////////

    // Declarar variables de uso
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // const [loading, setLoading] = useState(false); 

    const handleLogin = async (e) => {
        // const navigate = useNavigate();
        e.preventDefault();

        // Iniciar la pantalla de carga
        setLoading(true);


        // Reiniciar errores
        setError('');

        if (!EMAIL_REGEX.test(email)) {
            setError('Por favor, ingrese un correo electrónico válido.');
            setLoading(false);
            return; // Detiene el proceso si el correo no es válido
        }

        // if (!ALPHANUMERIC_REGEX.test(password)) {
        //     setError('Por favor, ingrese un valor válido para el campo');
        //     return;
        // }
    
        try {
            const response = await api.post('/auth/login', { email, password });
    
            if (response.status === 200) {
                // Guarda el JWT en localStorage o en un estado global/contexto
                localStorage.setItem('authToken', response.data.token);

                // Guardar Id del Usuario para ProfilePreview
                const decodedToken = jwtDecode(response.data.token);
                const userId = decodedToken.userId;
                localStorage.setItem('userId', userId);

                // Redirigir a Home
                onLogin();
                setCurrentPage('home');
                navigate('/home');

            } else {

                setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
                console.error('Error en la respuesta del servidor:', response);
            }
        } catch (error) {

            // Maneja errores de red o errores específicos del servidor
            setError('Credenciales incorrectas o error en el servidor.');
            console.error('Error al iniciar sesión:', error);

            if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Container className="py-5">
                    <Card className="h-100 shadow-sm p-5">
                        
                        <form onSubmit={handleLogin}>
                        <h3 className="display-10">Inicia Sesión</h3>
                        <br></br>
                            {/* Tomar credenciales*/}
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <label className="form-label" htmlFor="email">Correo Electrónico</label>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <label className="form-label" htmlFor="password">Contraseña</label>
                            </div>

                            {/* Envío de mensaje de error */}
                            {error && <div className="alert alert-danger mb-4">{error}</div>}

                            {/* Redirecciones */}
                            <div className="row mb-4 px-5">
                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="button-hover btn btn-success btn-lg">
                                    Iniciar Sesión
                                </button>
                            </div>
                            <div className="text-center">
                                <p>¿No estás registrado? <a href="" onClick={(e) => handleNavigation(e, '/register')}>¡Regístrate!</a></p>
                            </div>
                        </form>
                    </Card>
            </Container>
        </>
    );
};

export default Login;