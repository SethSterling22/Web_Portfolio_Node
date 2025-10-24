// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Footer = ({ setCurrentPage }) => {
    const navigate = useNavigate(); 
    
    const handleNavigation = (e, page) => {
        e.preventDefault();
        navigate(page);
    };
    return (
        
            
                <footer className="py-4 bg-dark m-0 p-0 text-white p-5">
                <Row>
                    <Col md={6} className="text-center text-md-start">
                        <span>&copy; {new Date().getFullYear()} Portfolio 3.0. Todos los derechos reservados.</span>
                    </Col>
                    <Col md={6} className="text-center text-md-end">
                        <a onClick={(e) => handleNavigation(e, '/terms')}  className="btn btn-link text-white mx-2">
                            Términos de uso 🤓
                        </a>
                        <a  onClick={(e) => handleNavigation(e, '/privacy')} className="btn btn-link text-white mx-2">
                            Política de privacidad 🧐
                        </a>
                        {/* <a href="/terms" className="text-white mx-2">
                            Términos de uso 🤓
                        </a>
                        <a href="/privacy" className="text-white mx-2">
                            Política de privacidad 🧐
                        </a> */}
                    </Col>
                </Row>
                </footer>
        
        
    );
};

export default Footer;