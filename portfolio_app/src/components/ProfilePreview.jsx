// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';

import api from '../services/api';


const ProfilePreview = ({ setLoading }) => {

    const [error, setError] = useState(null);

    const [User, setUser] = useState('');
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    // const [userId, setUserId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false); 

    useEffect(() => {
        const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                throw new Error('Favor Iniciar Sesión para poder ver la previsualización de su Perfil :^)');
            }
            
            // const decodedToken = jwtDecode(token);
            // const userId = decodedToken.userId;
            // setUserId(userId);
    
            const userResponse = await api.get(`/users/${userId}`);
            if (userResponse.status === 200) {
                setUser(userResponse.data);
                setUserName(userResponse.data.FirstName);
                setUserLastName(userResponse.data.LastName);
                setUserDescription(userResponse.data.Description);
            } else {
                setError('No se pudo obtener la información del usuario.');
            }
            } catch (err) {
            setError(err.message);
            } finally {
            setLoading(false);
            }
        };
    
        fetchUserProfile();
    }, [setLoading]);

    const clearError = () => {
        setError(''); 
    };

    return (
    <>
    <Container className="py-5">
        <Card className="h-100 shadow-sm p-4">
            <Row className="mb-4">
                <Col>
            
                    <>
                    <h1 className="display-6"><b>Información de Perfil de: </b>{userName} {userLastName} 🕵🏻‍♂️</h1>
                    <Card className="shadow-sm mt-5">
                        
                        <Card.Body>
                        <h3>Previsualización de Perfil <a href="" className='text-danger text-decoration-none' onClick={(e) => handleNavigation(e, '/login')} title="inicie sesión para editar">*</a></h3>
                        <p className="lead mt-4">
                            <b>Email: </b> { User.Email }
                        </p>
                        <p className="lead">
                            <b>Descripción: </b>
                            {userDescription ? ( userDescription ) : ( "No se ha configurado una descripción..." )}
                        </p>

                        <p className="lead">
                            <b>Rol: </b>{ User.Role } 
                        </p>

                        <p className="lead">
                            <b>Registrado en: </b>{ User.RegisteredOn } 
                        </p>

                        <p className="lead">
                            <b>Último Inicio de Sesión: </b>{ User.LastLogin } 
                        </p>

                        <p className='lead text-success '>
                            <b>Activo:  { User.Deleted ? ( <b className=' text-danger'> El Usuario ha sido Eliminado</b> ) : ( <b className='lead text-success'> El Usuario Se encuentra activo</b> ) } </b>
                        </p> 
                        </Card.Body>
                    </Card>
                    </>
                
                </Col>
            </Row>

        </Card>            
        {error && (
        <div className="alert alert-danger" style={{ position: 'absolute', top: '70px', zIndex: "100000", left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={clearError}>
        {error}
        </div>
        )}
    </Container>
    </>
    );
};

export default ProfilePreview;