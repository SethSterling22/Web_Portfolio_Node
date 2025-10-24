// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Container, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

import { jwtDecode } from "jwt-decode";
import api from '../services/api';


const Profile = ({ setLoading }) => {

    const [error, setError] = useState(null);

    const [User, setUser] = useState('');
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editUserName, setEditUserName] = useState('');
    const [editUserLastName, setEditUserLastName] = useState('');
    const [editUserDescription, setEditUserDescription] = useState('');
    const [userId, setUserId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false); 

    useEffect(() => {
        const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No se ha encontrado el token de autenticación.');
            }
            
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setUserId(userId);
    
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


    // Iniciar la edición del perfil
    const handleEditProfile = () => {
        setIsEditing(true);
        setEditUserName(userName);
        setEditUserLastName(userLastName);
        setEditUserDescription(userDescription);
    };
    
    // Guardar los cambios del perfil
    const handleSaveProfile = async () => {
        setLoading(true);
        try {
        const updatedUser = {
            email: User.Email,
            firstName: editUserName,
            lastName: editUserLastName,
            description: editUserDescription,
        };
            await api.put(`/users/${userId}`, updatedUser);
            setUser({ ...User, firstName: editUserName, lastName: editUserLastName, description: editUserDescription });
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            setError(`No se pudo actualizar el perfil. Detalles: ${error.response?.data?.message || 'Error desconocido'}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    
    // Cancelar la edición del perfil
    const handleCancelEditProfile = () => {
        setIsEditing(false);
    };
    
    // Eliminar cuenta
    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            const updatedUser = {
                email: User.Email,
                firstName: User.FirstName,
                lastName: User.LastName,
                deleted: 1,
            };
            await api.put(`/users/${userId}`, updatedUser);
            // Remover Sesión
            localStorage.removeItem('authToken');
            window.location.href = '/login';
        } catch (error) {
            setError("No se pudo eliminar la cuenta. Detalles: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(''); 
    };

    return (
    <>
    <Container className="py-5">
        <Card className="h-100 shadow-sm p-4">
            <Row className="mb-4">
                <Col>
                {isEditing ? (
                    <>
                    
                    <h1 className="display-5"><b>Edición Perfil:</b> </h1>
                    
                        {/* Formulario de edición de perfil */}
                        <InputGroup>
                        <Form.Control id="name" value={editUserName} onChange={(e) => setEditUserName(e.target.value)}/>
                        </InputGroup>
                        <Form.Label  htmlFor="name" className='mb-4'>Nombre</Form.Label>
                    
                        <InputGroup>
                        <Form.Control id="lastname" value={editUserLastName} onChange={(e) => setEditUserLastName(e.target.value)}/>
                        </InputGroup>
                        <Form.Label  htmlFor="lastname" className='mb-4'>Apellido</Form.Label>
                    
                    <Card className="shadow-sm">
                    
                        <Form.Control as="textarea" rows={3} value={editUserDescription} onChange={(e) => setEditUserDescription(e.target.value)}/>
                        
                    </Card>
                    <Form.Label className='mb-4' htmlFor="lastname">Descripción:</Form.Label>

                    {/* Botones de guardado o cancelado */}
                    <div className='d-flex gap-2'>
                        <Button variant="success" onClick={handleSaveProfile}>
                            <Save size={16} className="mr-2" /> Guardar
                        </Button>
                        <Button variant="outline-danger"  onClick={handleCancelEditProfile}>
                            <X size={16} className="mr-2"/> Cancelar
                        </Button>
                    </div> 
                    </>
                ) : (
                    <>
                    <h1 className="display-6"><b>Información de Perfil de: </b>{userName} {userLastName}👷🏻‍♂️ </h1>
                    <Card className="shadow-sm mt-5">
                        <Card.Body>
                        <p className="lead">
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

                        <p className="lead text-success">
                            <b>Activo: </b> { User.Deleted ? (User.Deleted) : ( "Usuario Se encuentra activo" ) } 
                        </p>
                        <div className='d-flex gap-2'>
                            <Button variant="outline-primary" onClick={handleEditProfile}> <Edit size={16} />Editar Perfil</Button>
                            <Button variant="danger" onClick={() => setShowDeleteModal(true)}><Trash2 size={16} />Eliminar Cuenta</Button>
                        </div> 
                        </Card.Body>
                    </Card>
                    </>
                )}
                </Col>
            </Row>

        </Card>            
        {error && (
        <div className="alert alert-danger" style={{ position: 'absolute', top: '70px', zIndex: "100000", left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={clearError}>
        {error}
        </div>
        )}
    </Container>
        {/* Modal de Confirmación para Eliminar Cuenta */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
                <Button variant="danger" onClick={handleDeleteAccount}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    </>
    );
};

export default Profile;