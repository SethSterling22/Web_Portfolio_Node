// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

import { jwtDecode } from "jwt-decode";
import api from '../services/api';

// import profileImage from '../assets/profile.jpg';

const Education = ({ setLoading }) => {

//   const [educations, setEducations] = useState([]);
//   const [error, setError] = useState(null);
//   const [User, setUser] = useState('');

  // const [educations, setEducations] = useState([]);
  // const [error, setError] = useState(null);
    const [educations, setEducations] = useState([]);
    const [error, setError] = useState(null);
    const [User, setUser] = useState('');

    const [newInstitution, setNewInstitution] = useState('');
    const [newDegreeId, setNewDegreeId] = useState('1'); 
    const [isEditing, setIsEditing] = useState(false);
    const [newFieldOfStudy, setNewFieldOfStudy] = useState('');
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [editeducationId, setEditeducationId] = useState(null);
    const [editInstitution, setEditInstitution] = useState('');
    const [editDegreeId, setEditDegreeId] = useState(''); // Cambiado a String
    const [editFieldOfStudy, setEditFieldOfStudy] = useState('');
    const [editStartDate, setEditStartDate] = useState('');
    const [editEndDate, setEditEndDate] = useState('');
    const [showAddeducationForm, setShowAddeducationForm] = useState(false);
    const [userId, setUserId] = useState(null);

    const [degrees, setDegrees] = useState([
        { id: "1", name: "Bachelors" },
        { id: "2", name: "Masters" },
        { id: "3", name: "PHD" },
    ]);

    useEffect(() => {
        const fetchEducations = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                throw new Error('No se ha encontrado el token de autenticación.');
                }
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;
                setUserId(userId);

                // Obtener el nombre del usuario
                const userResponse = await api.get(`/users/${userId}`);
                if (userResponse.status === 200) {
                setUser(userResponse.data);
                } else {
                setError('No se pudo obtener la información del usuario.');
                }

                const response = await api.get(`/educations/${userId}`);
                if (response.status === 200) {
                setEducations(response.data);
                // console.log(response.data)
                } else {
                setError('No se pudo cargar los datos de educación.');
                }


            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEducations();
    }, []);

    // Eliminar Educación
    const handleDeleteEducation = async (id) => {
        setLoading(true);
        try {
        await api.delete(`/educations/${userId}/${id}`);
        setEducations(educations.filter((education) => education.id !== id));
        window.location.reload();
        } catch (err) {
        setError('No se pudo eliminar la educación.');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    // Inicializar campos de Editar Educación
    const handleEditEducation = (education) => {
        setEditeducationId(education.Id);
        setEditInstitution(education.Institution);
        setEditDegreeId(education.DegreeId); 
        setEditFieldOfStudy(education.FieldOfStudy);
        setEditStartDate(education.StartDate);
        setEditEndDate(education.EndDate);
        setIsEditing(true);
    };

    // Editar Educación
    const handleSaveEducation = async (id) => {
        setLoading(true);
        try {
            const updatedEducation = {
                institution: editInstitution,
                degreeId: editDegreeId, 
                fieldOfStudy: editFieldOfStudy,
                startDate: editStartDate,
                endDate: editEndDate
            };
            await api.put(`/educations/${userId}/${id}`, updatedEducation);
            setEducations(
                educations.map(education =>
                    education.id === id ? { ...education, ...updatedEducation } : education
                )
            );
            setIsEditing(false);
            setEditeducationId(null);
            setEditInstitution('');
            setEditDegreeId('');
            setEditFieldOfStudy('');
            setEditStartDate('');
            setEditEndDate('');
            window.location.reload();
        } catch (error) {
            setError("No se pudo guardar los cambios. Detalles: " + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Agregar nueva Educación
    const handleAddEducation = async () => {
        setLoading(true);
        try {
            if (!newInstitution.trim() || !newFieldOfStudy.trim() || !newStartDate || !newEndDate) {
                setError('Todos los campos son obligatorios.');
                return;
            }

            const newEducation = {
                institution: newInstitution,
                degreeId: newDegreeId,
                fieldOfStudy: newFieldOfStudy,
                startDate: newStartDate,
                endDate: newEndDate
            };
            const response = await api.post(`/educations/${userId}`, newEducation);
            if (response.status === 201) {
                setEducations([...educations, response.data]);
                setNewInstitution('');
                setNewDegreeId('');
                setNewFieldOfStudy('');
                setNewStartDate('');
                setNewEndDate('');
                setShowAddeducationForm(false);
            }
            else{
                setError("No se pudo agregar la información")
            }
            window.location.reload();

        } catch (error) {
            setError('No se pudo agregar el registro de educación.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditeducationId(1);
        setEditInstitution('');
        setEditDegreeId('');
        setEditFieldOfStudy('');
        setEditStartDate('');
        setEditEndDate('');
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
                <h1 className="display-5">
                    <b>Educación de: </b>
                    {User.FirstName} {User.LastName} 👨🏻‍🎓
                </h1>
                <p className="lead">
                    {User.Description
                    ? User.Description
                    : 'No se ha configurado una descripción...'}
                </p>
                </Col>
            </Row>

            <Row className="g-4">
                <Col>
                <Card className="h-100 shadow-sm">
                    <Card.Body>
                    <Card.Title>Mi Educación</Card.Title>
                    <div className="d-flex flex-wrap gap-2 mt-4">
                        {educations.length > 0 ? (
                        educations.map((education) => {
                            return (
                            <div key={education.Id} className="d-flex flex-column  mb-4 border rounded p-2">
                                {editeducationId === education.Id ? (
                                    <>
                                        <InputGroup className="mb-2">
                                            <span className="input-group-text">Institución</span>
                                            <Form.Control value={editInstitution} onChange={(e) => setEditInstitution(e.target.value)} />
                                        </InputGroup>
                                        
                                        <InputGroup className="mb-2">
                                            <span className="input-group-text">Grado</span>
                                            <Form.Select  value={editDegreeId}  onChange={(e) => setEditDegreeId(e.target.value)}>
                                                {degrees.map(degree => (
                                                    <option key={degree.id} value={degree.id}>{degree.name}</option>
                                                ))}
                                            </Form.Select>
                                        </InputGroup>
                                        
                                        <InputGroup className="mb-2">
                                        <span className="input-group-text">Campo de Estudio</span>
                                            <Form.Control value={editFieldOfStudy} onChange={(e) => setEditFieldOfStudy(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-2">
                                        <span className="input-group-text">Fecha de Inicio</span>
                                            <Form.Control type='date' value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)} />
                                        </InputGroup>
                                        <InputGroup className="mb-2">
                                        <span className="input-group-text">Fecha de Fin</span>
                                            <Form.Control  type='date' value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} />
                                        </InputGroup>
                                        <div className='d-flex gap-2 mt-4'>
                                        <Button variant="outline-success" size="sm" onClick={() => handleSaveEducation(education.Id)}>
                                            <Save size={16} /> Guardar
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={handleCancelEdit}>
                                            <X size={16} /> Cancelar
                                        </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p><b>Institución:</b> {education.Institution}</p>
                                        <p><b>Grado: </b>{education.DegreeName}</p>
                                        <p><b>Campo de Estudio:</b> {education.FieldOfStudy}</p>
                                        <p><b>Fecha de Inicio:</b> {education.StartDate}</p>
                                        <p><b>Fecha de Fin:</b> {education.EndDate}</p>
                                        <div className='d-flex gap-2 mt-4'>
                                        <Button variant="outline-primary" size="sm" onClick={() => handleEditEducation(education)}>
                                            <Edit size={16} /> Editar
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteEducation(education.Id)}>
                                            <Trash2 size={16} /> Eliminar
                                        </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                            );
                        })
                        ) : (
                        <p>No se han encontrado registros de educación.</p>
                        )}
                    </div>
                    {/* Botón para mostrar/ocultar el formulario de agregar */}
                    {!showAddeducationForm && (
                        <Button
                        variant="outline-success"
                        className="mt-3"
                        onClick={() => setShowAddeducationForm(true)}
                        >
                        <Plus size={16} className="mr-2" /> Agregar Educación
                        </Button>
                    )}

                    {/* Formulario para agregar un nuevo registro de educación */}
                    {showAddeducationForm && (
                        <div className="mt-3">
                            <h4>Agregar Nuevo Registro</h4>
                            <InputGroup className="mb-2 mt-4">
                                <span className="input-group-text">Institución</span>
                                <Form.Control placeholder="Institución" value={newInstitution} onChange={(e) => setNewInstitution(e.target.value) } required/>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <span className="input-group-text">Grado</span>
                                <Form.Select  value={newDegreeId}  onChange={(e) => setNewDegreeId(e.target.value)} required>
                                    {degrees.map(degree => (
                                        <option key={degree.id} value={degree.id}>{degree.name}</option>
                                    ))}
                                </Form.Select>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <span className="input-group-text">Campo de Estudio</span>
                                <Form.Control placeholder="Campo de Estudio" value={newFieldOfStudy} onChange={(e) => setNewFieldOfStudy(e.target.value) } required/>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <span className="input-group-text">Fecha de Inicio</span>
                                <Form.Control type="date" placeholder="Fecha de Inicio" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} required/>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <span className="input-group-text">Fecha de Fin</span>
                                <Form.Control type="date" placeholder="Fecha de Fin" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} required/>
                            </InputGroup>

                            <div className="d-flex gap-2 mt-4">
                                <Button variant="success" onClick={handleAddEducation}>
                                    <Save size={16} className="mr-2" /> Guardar
                                </Button>
                                <Button variant="outline-danger" onClick={() => setShowAddeducationForm(false)} >
                                    <X size={16} className="mr-2" /> Cancelar
                                </Button>
                            </div>
                        </div>
                    )}
                    </Card.Body>
                </Card>
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

export default Education;