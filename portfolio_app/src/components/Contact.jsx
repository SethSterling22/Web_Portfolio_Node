// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

// import React, { useState } from 'react';
// import { Card, Form, Button, Alert, Row, Col, Container } from 'react-bootstrap';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     message: ''
//   });
//   const [validated, setValidated] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;
    
//     if (form.checkValidity() === false) {
//       e.stopPropagation();
//       setValidated(true);
//       return;
//     }

//     // Reiniciar el formulario después de envío
//     setTimeout(() => {
//       setFormData({ email: '', message: '' });
//       setValidated(false);
//       setShowSuccess(true);
//       setError(null);
//     }, 1500);
//   };

//   return (
//     <Container className="py-5"> 
//       <Card className="shadow-sm p-4">
//         <Row className="mb-4">
//           <Col>
//             <h1 className="display-4">¡Contáctame!</h1>
//           </Col>
//         </Row>

//         {showSuccess && (
//           <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
//             ¡Mensaje enviado! :D
//           </Alert>
//         )}

//         {error && (
//           <Alert variant="danger" onClose={() => setError(null)} dismissible>
//             {error}
//           </Alert>
//         )}

//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="formEmail">
//             <Form.Label>Correo Electrónico</Form.Label>
//             <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="ejemplo@ejemplo.com" required/>
//             <Form.Control.Feedback type="invalid">
//               Correo electrónico inválido :(
//             </Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-4" controlId="formMessage">
//             <Form.Label>Mensaje</Form.Label>
//             <Form.Control as="textarea" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Escribe tu mensaje..." required/>

//             <Form.Control.Feedback type="invalid">
//               Se requiere un mensaje para enviar el correo :D
//             </Form.Control.Feedback>
//           </Form.Group>

//           <div className="d-grid">
//             <Button variant="success" type="submit" size="lg" className='button-hover'>
//               Enviar
//             </Button>
//           </div>
//         </Form>

//         <Row className="mt-4">
//           <Col>
//             <Card className="bg-light">
//               <Card.Body>
//                 <Card.Title>También puedes contactarme a través de:</Card.Title>
//                 <Card.Text>
//                   <strong>Email:</strong> sebastian.hernandez11@upr.edu<br />
//                   <strong>Teléfono:</strong> +1 (921) - 686 - 8190
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Card>
//     </Container> 
//   );
// };

// export default Contact;


import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Send, Trash2, Mail, CheckCircle, AlertTriangle } from 'lucide-react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

const Contact = ({ setLoading }) => {
  const [contacts, setContacts] = useState([]);
  const [users, setUserts] = useState([]);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []); 

  
  useEffect(() => {
    const fetchContacts = async () => {
      if (!userId) return;
      setLoading(true);
      try {


        // Recibe el mensaje con mi userId, dependiendo del email
        const response = await api.get(`/contacts/${userId}`);
        if (response.status === 200) {
          setError('');
          setContacts(response.data);
        } else {
          setError('No se pudo obtener los mensajes recibidos.');
        }

        // const responseUser = await api.get(`/users/${contacts.Id}`);
        // if (responseUser.status === 200) {
        //   setError('');
        //   setContacts(responseUser.data);
        // } else {
        //   setError('No se pudo obtener la información del usuario.');
        // }


      } catch (err) {
        setError('No se pudieron cargar los mensajes de contacto.');
        console.error(err);
      } finally {
        // window.location.reload();
        setLoading(false);
      }
    };
  
    fetchContacts();
  }, [userId]);


  // useEffect(() => {

  //   const fetchContacts = async () => {
  //     try {
  //       const token = localStorage.getItem('authToken');
  //       if (token) {
  //         const decodedToken = jwtDecode(token);
  //         setUserId(decodedToken.userId);
  //       }


        
  //       // const response = await api.get(`/contacts/${userId}`);
  //       // setContacts(response.data);
  //     } catch (err) {
  //       setError('No se pudieron cargar los mensajes de contacto.');
  //       console.error(err);
  //     }
  //   };
  //   fetchContacts();
  // }, [userId]);


  const handleSendMessage = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }
    if (!message) {
      setError('Por favor, ingresa tu mensaje.');
      return;
    }

    try {
      const newContact = {
        email,
        message,
      };

      // Envía el mensaje a la persona
      const response = await api.post(`/contacts/${userId}`, newContact);
      if (response.status === 201) {
        setSuccess(`Mensaje enviado exitosamente a ${newContact.email}`);
        setEmail('');
        setMessage('');
        // setContacts(prevContacts => [...prevContacts, response.data]);
        // window.location.reload();
      } else {
        setError('No se pudo enviar el mensaje.');
      }
      
    } catch (err) {
      setError('No se pudo enviar el mensaje. Por favor, inténtalo de nuevo.');
      console.error(err);
    }finally {
      // window.location.reload();
      setLoading(false);
    }
  };


  const handleDeleteContact = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/contacts/${userId}/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
      setSuccess('Mensaje eliminado exitosamente.');
      window.location.reload();
    } catch (err) {
      setError('No se pudo eliminar el mensaje.');
      console.error(err);
    } finally {
      // window.location.reload();
      setLoading(false);
    }
  };

  const clearError = () => {
    setError('');
  };


  return (
    <Container className="py-5">
      <h1 className="display-4 mb-4">Contacto</h1>

      <Card className="shadow-sm mb-5">
        <Card.Body>
          <h2 className="card-title mb-4">Enviar un Mensaje</h2>
          <Form onSubmit={handleSendMessage}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa el correo electrónico del destinatario" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Ingresa tu mensaje" value={message} onChange={(e) => setMessage(e.target.value)}/>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 button-hover">
              <Send className="mr-2" /> Enviar Mensaje
            </Button>
          </Form>
          {error && (
            <Alert variant="danger" className="mt-3">
              <AlertTriangle className="mr-2" onClick={clearError}/> {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mt-3">
              <CheckCircle className="mr-2" /> {success}
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Mostrar mensajes */}
      {contacts.length > 0 && (
        <>
          <h2 className="mb-4">Mensajes Recibidos</h2>
          {contacts.map((contact) => (
            <Card key={contact.Id} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex align-items-center gap-2">
                  <Mail className="mr-2" /> De: {contact.UserEmail} - {contact.UserFirstName} {contact.UserLastName} 
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Enviado: {contact.SentDate}
                </Card.Subtitle>
                <Card.Text>{contact.Message}</Card.Text>
                <Button variant="outline-danger" size="sm" onClick={() => handleDeleteContact(contact.Id)} className="mt-2"
                >
                  <Trash2 size={16} /> Eliminar
                </Button>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default Contact;