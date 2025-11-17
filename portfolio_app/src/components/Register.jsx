// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState } from 'react';
import api from '../services/api';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// Verificación de Email
import { EMAIL_REGEX, ALPHANUMERIC_REGEX, PASSWORD_REGEX } from '../constants/constants.jsx';


const Register = ({ setAuthError, setLoading }) => {

    // Declarar variables de uso
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 

    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);

        // Reiniciar errores
        setError('');
        setSuccessMessage('');

        if (!EMAIL_REGEX.test(email)) {
            setLoading(false);
            setError('Por favor, ingrese un correo electrónico válido.');
            return; // Detiene el proceso si el correo no es válido
        }

        if (!ALPHANUMERIC_REGEX.test(firstName) && !ALPHANUMERIC_REGEX.test(lastName)) {
            setLoading(false);
            setError('Por favor, ingrese un valor válido');
            return;
        }

        if (password !== password2) {
            setError('Las contraseñas deben coincidir.');
            setLoading(false);
            return;
        }
    
        if (!PASSWORD_REGEX.test(password)) {
            setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.');
            setLoading(false);
            return;
        }
    
        // Consulta al API
        try {
            const response = await api.post('/users', { email, password, firstName, lastName, });
    
            if (response.status === 201) {
            // Guarda el JWT en localStorage o en un estado global/contexto
            // localStorage.setItem('authToken', response.data.token);
            console.log('Usuario registrado exitosamente:', response.data);
            setSuccessMessage('¡Usuario registrado exitosamente! Redirigiendo para Iniciar Sesión...'); 
            // onLogin();
            // setCurrentPage('home');
            setTimeout(() => {
                navigate('/login');
            }, 3000);

            } else {
                const errorMessage = response.data?.message || 'Error al registrar usuario. Por favor, inténtelo de nuevo.';
                setError(errorMessage);
                console.error('Error al registrar usuario:', errorMessage, response);
                setAuthError(errorMessage); 
            }

        } catch (error) {
            // Maneja errores de red o errores específicos del servidor
            setError('Error en el servidor *o*');
            console.error('Error Crear cuenta:', error);

            if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
            }
        } finally {
            setLoading(false); // Desactivar la pantalla de carga 
        }
        
    };

    return (
        <>
            <Container className="py-5">
                    <Card className="h-100 shadow-sm p-5">
                        <form onSubmit={handleRegister}>
                        <h3 className="display-10">Formulario de Registro</h3>
                        <br></br>
                            {/* Tomar credenciales*/}
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <label className="form-label" htmlFor="email">Correo Electrónico</label>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="text" id="nombre" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                                <label className="form-label" htmlFor="nombre">Nombre</label>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="text" id="apellido" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                                <label className="form-label" htmlFor="apellido">Apellido</label>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4">
                                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                                <label className="form-label" htmlFor="password">Contraseña</label>
                                <p className="text-muted">La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.*</p>
                                <input type="password" id="password2" className="form-control" value={password2} onChange={(e) => setPassword2(e.target.value)} required/>
                                <label className="form-label" htmlFor="password2">Confirmar Contraseña</label>
                            </div>

                            {/* Envío de mensajes */}
                            {error && <div className="alert alert-danger mb-4">{error}</div>}
                            {successMessage && <div className="alert alert-success mb-4">{successMessage}</div>}

                            {/* Redirecciones */}
                            <div className="row mb-4 px-5">
                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="button-hover btn btn-success btn-lg">
                                    Crear Cuenta Nueva
                                </button>
                            </div>
                        </form>
                    </Card>
            </Container>
        </>
    );
};
export default Register;
