// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import appImage from '../assets/App.jpg';
import portfolioImage from '../assets/portfolio_example.png';
import contactImage from '../assets/contact_example.jpg';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    ///////////////////////////////////////////////////
    // Manejo de redireciones :)
    const navigate = useNavigate();
    const handleNavigation = (e, page) => {
        e.preventDefault();
        navigate(page);
    };
    ///////////////////////////////////////////////////

  return (
    <>

    <div className="py-5 text-center bg-white">
        <h1 className="display-4 fw-bold mt-5">User Portfolio Management System</h1>
        <div className="col-lg-6 mx-auto  mt-5">
            <p className="lead mb-4">Utiliza esta fabulosa herramienta para registrar y crear tu portafolio virtual basado en tu experiencia. ¡Recopila y organiza tu información para darle la apariencia profesional que las empresas están buscando! </p>
            <a className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-5 text-decoration-none" href="" onClick={(e) => handleNavigation(e, '/login')} >
                <button type="button" className="btn btn-primary btn-lg px-4 gap-5 text-white" >Empezar 🡺</button>
            </a>
            <div className="overflow-hidden mt-5">
                <div className="container ">
                    <img src={appImage} className="img-fluid border rounded-3" alt="Application View :D" loading="lazy"/>
                </div>
            </div>
        </div>
    </div>

    <div className="py-5 text-center bg-white mt-5">
        <h1 className="display-6 fw-bold mt-5">¿Cuál es tu alcance?</h1>
        <div className="col-lg-6 mx-auto  mt-5">
            <p className="lead mb-4">No solamente podrás exponer tus grandiosas habilidades, sino también podrás brindar tu contacto para enlazarte con recursos que puedan necesitar de tus servicios.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-5">
              <Card className="h-100 shadow-sm p-4">
                <Row className="mb-4">
                  <img src={portfolioImage} className="img-fluid border rounded-3" style={{ maxHeight: '260px' }} alt="Porfolio View :D" loading="lazy"/>
                  <h3 className="display-10 mt-5">Crea tu portafolio</h3>
                </Row>
              </Card>
              <Card className="h-100 shadow-sm p-4">
                <Row className="mb-4">
                  <img src={contactImage} className="img-fluid border rounded-3" style={{ maxHeight: '260px' }} alt="Contact View :D" loading="lazy"/>
                  <h3 className="display-10 mt-5">Conecta con otros</h3>
                </Row>
              </Card>
                {/* <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
                <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button> */}
            </div>
            <div className="overflow-hidden mt-5">

            </div>
        </div>
    </div>


    
    </>
  );
};

export default Welcome;


