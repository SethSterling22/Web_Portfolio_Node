// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Container, Button, Form, InputGroup, Accordion, Badge } from 'react-bootstrap';
import { Save, Plus, X, Edit, Trash2 } from 'lucide-react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

const Experience = ({ setLoading }) => {
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [User, setUser] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperienceId, setEditedExperienceId] = useState(null);

  // Estados para el formulario de agregar/editar
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newIsProject, setNewIsProject] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const [editJobTitle, setEditJobTitle] = useState('');
  const [editCompany, setEditCompany] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editIsProject, setEditIsProject] = useState(false);


  // Cargar la información principal
  useEffect(() => {
    const fetchExperiences = async () => {
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

        const response = await api.get(`/experiences/${userId}`);
        if (response.status === 200) {
          setExperiences(response.data);
        } else {
          setError('No se pudieron cargar los datos de experiencia.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  // Añadir nueva experiencia
  const handleAddExperience = async () => {
    setLoading(true);
    try {
      if (!newJobTitle.trim() || !newDescription.trim() || !newStartDate || !newEndDate) {
        setError('Todos los campos son obligatorios.');
        return;
      }

      const newExperience = {
        jobTitle: newJobTitle,
        company: newCompany,
        description: newDescription,
        startDate: newStartDate,
        endDate: newEndDate,
        isProject: newIsProject,
      };

      const response = await api.post(`/experiences/${userId}`, newExperience);
      if (response.status === 201) {
        setExperiences([...experiences, {
            ...response.data,
            // startDate: formatDate(response.data.startDate),
            // endDate: formatDate(response.data.endDate)
        }]);
        resetForm();
        setShowAddForm(false);
        window.location.reload();
      } else {
        setError('No se pudo agregar la experiencia.');
      }
    } catch (err) {
      setError('No se pudo agregar la experiencia.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Inicializar variables para editar
  const handleEditExperience = (experience) => {
    setEditedExperienceId(experience.Id);
    setEditJobTitle(experience.JobTitle);
    setEditCompany(experience.Company);
    setEditDescription(experience.Description);
    setEditStartDate(experience.StartDate);
    setEditEndDate(experience.EndDate);
    setEditIsProject(experience.IsProject);
    setIsEditing(true);
  };

  // Editar experiencia
  const handleSaveExperience = async (id) => {
    setLoading(true);
    try {
      const updatedExperience = {
        jobTitle: editJobTitle,
        company: editCompany,
        description: editDescription,
        startDate: editStartDate,
        endDate: editEndDate,
        isProject: editIsProject,
      };

      await api.put(`/experiences/${userId}/${id}`, updatedExperience);
      setExperiences(
        experiences.map((exp) =>
          exp.id === id ? { ...exp, ...updatedExperience } : exp
        )
      );
      setIsEditing(false);
      resetForm();
      setEditedExperienceId(null);
      window.location.reload();
    } catch (err) {
      setError('No se pudo guardar la experiencia.');
      console.error(err);
    } finally {
      // window.location.reload();
      setLoading(false);
    }
  };

  // Eliminar Experiencia
  const handleDeleteExperience = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/experiences/${userId}/${id}`);
      setExperiences(experiences.filter((exp) => exp.id !== id));
      window.location.reload();
    } catch (err) {
      setError('No se pudo eliminar la experiencia.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewJobTitle('');
    setNewCompany('');
    setNewDescription('');
    setNewStartDate('');
    setNewEndDate('');
    setNewIsProject(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedExperienceId(null);
    resetForm();
  };

  const clearError = () => {
    setError('');
  };


  
  // Agrupar experiencias por categoría
  const groupedExperiences = () => {
    const grouped = {};
    experiences.forEach(exp => {
      const category = exp.IsProject ? 'Proyectos' : exp.Company ? 'Trabajo / Internado' : 'Cursos';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(exp);
    });
    return grouped;
  };

  const grouped = groupedExperiences();

  return (
    <>

<Container className="py-5">
        <Card className="h-100 shadow-sm p-4">
          <Row className="mb-4">
            <Col>
              <h1 className="display-6">
                <b>Experiencia y Proyectos de: </b> {User.FirstName} {User.LastName} 👨🏻‍🎓
              </h1>
            </Col>
          </Row>

          <Row className="g-4">
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Mi Experiencia</Card.Title>
                  <Accordion defaultActiveKey="0" flush>
                    {Object.entries(grouped).map(([category, items], catIndex) => (
                      <Accordion.Item key={catIndex} eventKey={catIndex.toString()}>
                        <Accordion.Header>
                          <span className="text-capitalize">{category}</span>
                          <Badge bg="success" className="ms-2">
                            {items.length}
                          </Badge>
                        </Accordion.Header>
                        <Accordion.Body>
                          {items.map((item, itemIndex) => (
                            <Card key={itemIndex} className="mb-3 shadow-sm">
                              <Card.Body>
                                <Card.Title>{item.JobTitle}</Card.Title>
                                {item.Company && <Card.Subtitle className="mb-2 text-muted">
                                  {item.Company}
                                </Card.Subtitle>}
                                <Card.Text className="text-muted small">{item.StartDate} - {item.EndDate}</Card.Text>
                                <Card.Text>{item.Description}</Card.Text>
                                {isEditing && editedExperienceId === item.Id ? (
                                  <>
                                    <InputGroup className="mb-2">
                                      <span className="input-group-text">Título</span>
                                      <Form.Control value={editJobTitle} onChange={(e) => setEditJobTitle(e.target.value)}/>
                                    </InputGroup>
                                    {item.Company && <InputGroup className="mb-2">
                                      <span className="input-group-text">Compañía</span>
                                      <Form.Control value={editCompany} onChange={(e) => setEditCompany(e.target.value)}/>
                                    </InputGroup>}
                                    <InputGroup className="mb-2">
                                      <span className="input-group-text">Descripción</span>
                                      <Form.Control value={editDescription} onChange={(e) => setEditDescription(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-2">
                                      <span className="input-group-text">Fecha Inicio</span>
                                      <Form.Control type="date" value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)}/>
                                    </InputGroup>
                                    <InputGroup className="mb-2">
                                      <span className="input-group-text">Fecha Fin</span>
                                      <Form.Control type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)}/>
                                    </InputGroup>


                                    <InputGroup className="mb-2">
                                      <span className="input-group-text d-flex">Tipo</span>
                                        <div className="d-flex align-items-center">

                                          {/* Es un proyecto */}
                                          <input type="radio" id="project-edit" className="ms-2 btn-check" autoComplete="off" checked={editIsProject === true} onChange={() => setEditIsProject(true)}/>
                                          <label className="btn btn-outline-light me-2" htmlFor="project-edit">Proyecto</label>

                                          {/* Es un trabajo o un internado */}
                                          <input type="radio" id="work-edit" className="btn-check" autoComplete="off" checked={editIsProject === false && editCompany} onChange={() => setEditIsProject(false)}/>
                                          <label className="btn btn-outline-light me-2" htmlFor="work-edit">Trabajo</label>

                                          {/* Es un curso */}
                                          <input type="radio" id="course-edit" className="btn-check" autoComplete="off" checked={editIsProject === false && !editCompany} onChange={() => setEditIsProject(null)} />
                                          <label className="btn btn-outline-light" htmlFor="course-edit" title="Compañía debe estar Vacío">Curso</label>
                                        </div>
                                    </InputGroup>

                                    <div className="d-flex gap-2 mt-4">
                                      <Button variant="outline-success" size="sm" onClick={() => handleSaveExperience(item.Id)}>
                                        <Save size={16} /> Guardar
                                      </Button>
                                      <Button variant="outline-danger" size="sm" onClick={handleCancelEdit}>
                                        <X size={16} /> Cancelar
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="d-flex gap-2 mt-4">
                                    <Button variant="outline-primary" size="sm" onClick={() => handleEditExperience(item)}> 
                                    <Edit size={16} /> Editar
                                    </Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteExperience(item.Id)}>
                                      <Trash2 size={16} /> Eliminar
                                    </Button>
                                  </div>
                                )}
                              </Card.Body>
                            </Card>
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                  {!showAddForm && (
                    <Button variant="outline-success" className="mt-3" onClick={() => setShowAddForm(true)}>
                      <Plus size={16} className="mr-2" /> Agregar Experiencia
                    </Button>
                  )}
                  {showAddForm && (
                    <div className="mt-3">
                      <h4>Agregar Nueva Experiencia</h4>
                      <InputGroup className="mb-2 mt-4">
                        <span className="input-group-text">Título</span>
                        <Form.Control placeholder="Título" value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)}/>
                      </InputGroup>
                      <InputGroup className="mb-2">
                        <span className="input-group-text">Compañía</span>
                        <Form.Control placeholder="Compañía" value={newCompany} onChange={(e) => setNewCompany(e.target.value)}/>
                      </InputGroup>
                      <InputGroup className="mb-2">
                        <span className="input-group-text">Descripción</span>
                        <Form.Control placeholder="Descripción" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
                      </InputGroup>
                      <InputGroup className="mb-2">
                        <span className="input-group-text">Fecha de Inicio</span>
                        <Form.Control type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)}/>
                      </InputGroup>
                      <InputGroup className="mb-2">
                        <span className="input-group-text">Fecha de Fin</span>
                        <Form.Control type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)}/>
                      </InputGroup>

{/* 
                      <InputGroup className="mb-2 d-flex align-items-center">
                        <span className="input-group-text">Es Proyecto</span>
                        <input type="checkbox" className="btn-check" id="btn-check-outlined" autocomplete="off" checked={newIsProject} onChange={(e) => setNewIsProject(e.target.checked)}/>
                        <label className="btn btn-outline-info" for="btn-check-outlined">Sí</label><br></br>

                      </InputGroup> */}


                      <InputGroup className="mb-2">
                        <span className="input-group-text d-flex">Tipo</span>
                          <div className="d-flex align-items-center">

                            {/* Es un proyecto */}
                            <input type="radio" id="project-edit" className="ms-2 btn-check" autoComplete="off" checked={newIsProject === true} onChange={() => setNewIsProject(true)}/>
                            <label className="btn btn-outline-light me-2" htmlFor="project-edit">Proyecto</label>

                            {/* Es un trabajo o un internado */}
                            <input type="radio" id="work-edit" className="btn-check" autoComplete="off" checked={newIsProject === false && newCompany} onChange={() => setNewIsProject(false)}/>
                            <label className="btn btn-outline-light me-2" htmlFor="work-edit">Trabajo</label>

                            {/* Es un curso */}
                            <input type="radio" id="course-edit" className="btn-check" autoComplete="off" checked={newIsProject === false && !newCompany} onChange={() => setNewIsProject(null)} />
                            <label className="btn btn-outline-light" htmlFor="course-edit" title="Compañía debe estar Vacío">Curso</label>
                          </div>
                        </InputGroup>


                      
                      <div className="d-flex gap-2 mt-4">
                        <Button variant="success" onClick={handleAddExperience}> 
                          <Save size={16} className="mr-2" /> Guardar
                        </Button>
                        <Button variant="outline-danger" onClick={() => setShowAddForm(false)}>
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
          <div className="alert alert-danger" style={{ position: 'absolute', top: '70px', zIndex: "100000", left: '50%', transform: 'translateX(-50%)', cursor: 'pointer',}} onClick={clearError}>
            {error}
          </div>
        )}
      </Container>

    </>
  );
};

export default Experience;