// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Badge, Container, Button, Form, InputGroup } from 'react-bootstrap';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';

import { jwtDecode } from "jwt-decode";
import api from '../services/api';

// import profileImage from '../assets/profile.jpg';

const Home = ({ setLoading }) => {

  const [skills, setSkills] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [User, setUser] = useState('');

  // const [skills, setSkills] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Básico');
  const [editSkillId, setEditSkillId] = useState(null);
  const [editSkillName, setEditSkillName] = useState('');
  const [editSkillProficiency, setEditSkillProficiency] = useState('');
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No se ha encontrado el token de autenticación.');
        }
        
        // Decodificación del JWT para obtener la información del usuario
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);

        // Obtener el nombre del usuario
        const userResponse = await api.get(`/users/${userId}`);
        if (userResponse.status === 200) {
          setUser(userResponse.data);
        } else {
          setError('No se pudo la información del usuario.');
        }

        const response = await api.get(`/skills/${userId}`);
        if (response.status === 200) {
          setSkills(response.data);
        } else {
          setError('No se pudieron cargar las habilidades.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Cambiar los colores dependiendo del nivel de Proficiency
  const getProficiencyVariant = (proficiency) => {
    switch (proficiency) {
      case 'Avanzado':
        return 'success';
      case 'Intermedio':
        return 'warning';
      case 'Básico':
        return 'danger';
      default:
        return 'primary';
    }
  };


  // Eliminar una habilidad
  const handleDeleteSkill = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/skills/${userId}/${id}`);
      setSkills(skills.filter((skill) => skill.id !== id));
      window.location.reload(); 
    } catch (err) {
      setError('No se pudo eliminar la habilidad.');
      console.error(err);
    }finally {
      setLoading(false); 
    }
  };
  
    // Edición habilidad
    const handleEditSkill = (skill) => {
      setEditSkillId(skill.Id);
      setEditSkillName(skill.Name);
      setEditSkillProficiency(skill.Proficiency);
      setIsEditing(true);
    };
  
      // Guardar Habilidad editada
      const handleSaveSkill = async (id) => {
        setLoading(true);
        console.log(editSkillName)
        try {
          const updatedSkill = {
            name: editSkillName,
            proficiency: editSkillProficiency,
          };
          await api.put(`/skills/${userId}/${id}`, updatedSkill);
          setSkills(
            skills.map((skill) =>
              skill.id === id ? { ...skill, name: editSkillName, proficiency: editSkillProficiency } : skill
            )
          );
          setIsEditing(false);
          setEditSkillId(null);
          setEditSkillName('');
          setEditSkillProficiency('');
          window.location.reload();
        } catch (err) {
          setError('No se pudo guardar la habilidad.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
    // Agregar una nueva habilidad
    const handleAddSkill = async () => {
      setLoading(true);
      try {
        if (!newSkillName.trim()) {
          setError('El nombre de la habilidad no puede estar vacío.');
          return;
        }
        const token = localStorage.getItem('authToken');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const newSkill = {
          name: newSkillName,
          proficiency: newSkillProficiency
        };
        const response = await api.post(`/skills/${userId}`,  newSkill);
        if(response.status === 201){
          setSkills([...skills, response.data]);
          setNewSkillName('');
          // setNewSkillProficiency('Basic');
          setShowAddSkillForm(false); 
        }
        else{
          setError('No se pudo agregar la habilidad')
        }
        window.location.reload();
      } catch (err) {
        setError('No se pudo agregar la habilidad.');
        console.error(err);
      } finally {

        setLoading(false);
      }
    };
  
      const handleCancelEdit = () => {
        setIsEditing(false);
        setEditSkillId(null);
        setEditSkillName('');
        setEditSkillProficiency('');
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
            <h1 className="display-5"><b>Habilidades de: </b>{User.FirstName}  {User.LastName} 👨🏻‍💻 </h1>
            <p className="lead">
            {User.Description ? (
                User.Description
              ) : (
                "No se ha configurado una descripción..."
              )}
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>Mis Habilidades</Card.Title>
                <div className="d-flex flex-wrap gap-2">
                  {skills.length > 0 ? (
                    skills.map((skill) => {
                      const variant = getProficiencyVariant(skill.Proficiency);
                      return (
                        <div key={skill.Id} className="d-flex align-items-center gap-2 mb-2">
                          {editSkillId === skill.Id ? (
                            <>
                              <InputGroup>
                                <Form.Control value={editSkillName} onChange={(e) => setEditSkillName(e.target.value)}/>
                                <Form.Select value={editSkillProficiency} onChange={(e) => setEditSkillProficiency(e.target.value)}>
                                  <option value="Básico">Básico</option>
                                  <option value="Intermedio">Intermedio</option>
                                  <option value="Avanzado">Avanzado</option>
                                </Form.Select>
                              </InputGroup>
                              <Button variant="outline-success" size="sm" onClick={() => handleSaveSkill(skill.Id)}>
                                <Save size={16} />
                              </Button>
                              <Button variant="outline-danger" size="sm" onClick={handleCancelEdit}>
                                  <X size={16} />
                                </Button>
                            </>
                          ) : (
                            <>
                              <Badge bg={variant} className="fs-6 p-2">
                                {skill.Name} - {skill.Proficiency}
                              </Badge>
                              <Button variant="outline-primary" size="sm" onClick={() => handleEditSkill(skill)}>
                                <Edit size={16} />
                              </Button>
                              <Button variant="outline-danger" size="sm" onClick={() => handleDeleteSkill(skill.Id)}>
                                <Trash2 size={16} />
                              </Button>
                            </>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p>No se han encontrado habilidades.</p>
                  )}
                </div>
                {/* Botón para mostrar/ocultar el formulario de agregar */}
                {!showAddSkillForm && (
                  <Button variant="outline-success" className="mt-3" onClick={() => setShowAddSkillForm(true)}>
                    <Plus size={16} className="mr-2" /> Agregar Habilidad
                  </Button>
                )}

                {/* //////////////////////////////////////////////////// */}
                {/* Formulario para agregar una nueva habilidad */}
                {showAddSkillForm && (
                  <div className="mt-3">
                    <h4>Agregar Nueva Habilidad</h4>
                    <InputGroup className="mb-3">
                      <Form.Control placeholder="Nombre de la habilidad" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)}/>
                      <Form.Select value={newSkillProficiency} onChange={(e) => setNewSkillProficiency(e.target.value)}>

                        <option value="Básico">Básico</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>

                      </Form.Select>
                    </InputGroup>
                    <div className='d-flex gap-2'>
                      <Button variant="success" onClick={handleAddSkill}>
                          <Save size={16} className="mr-2" /> Guardar
                      </Button>
                      <Button variant="outline-danger" onClick={() => setShowAddSkillForm(false)}>
                          <X size={16} className="mr-2"/> Cancelar
                      </Button>
                    </div>
                  </div>
                )}
                {/* //////////////////////////////////////////////////// */}

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card>            
      {error && (
        <div className="alert alert-danger" style={{ position: 'absolute', top: '70px', zIndex: 100000, left: '50%', transform: 'translateX(-50%)', cursor: 'pointer' }} onClick={clearError}>
        {error}
        </div>
      )}
    </Container>
    </>
  );
};

export default Home;