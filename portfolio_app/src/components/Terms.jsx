// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Terms = () => {

    const navigate = useNavigate();
    const handleNavigation = (e, page) => {
        e.preventDefault();
        navigate(page);
    };

    return (
    <Container className="py-5">
        <Button variant="outline-secondary" className="mb-4" onClick={(e) => handleNavigation(e, '/welcome')}>
            ← Volver al inicio
        </Button>
            <Card className="shadow-sm p-4">
                <h1 className="mb-4">Términos de Uso 🤓</h1>
                
                <section className="mb-3">
                    <h2>1. Aceptación de los Términos</h2>
                    <p>
                    Al acceder y utilizar este sitio web, usted acepta cumplir con estos términos y condiciones. 
                    Si no está de acuerdo con alguna parte de estos términos, favor de no utilizar el sitio.
                    </p>
                </section>

                <section className="mb-3">
                    <h2>2. Uso del Contenido</h2>
                    <p>
                    Todo el contenido de este sitio es propiedad intelectual del autor. Se permite:
                    </p>
                    <ul>
                    <li>Visualización del contenido para uso personal</li>
                    <li>Compartir enlaces al contenido</li>
                    </ul>
                    <p>
                    Se prohíbe:
                    </p>
                    <ul>
                    <li>Modificar o copiar el contenido sin permiso.</li>
                    <li>Usar el contenido para fines comerciales e ilegales.</li>
                    </ul>
                </section>

                <section className="mb-3">
                    <h2>3. Comportamiento del Usuario</h2>
                    <p>
                    Los usuarios se comprometen a:
                    </p>
                    <ul>
                    <li>No realizar actividades que puedan dañar el sitio.</li>
                    <li>No enviar contenido malicioso o spam,</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Limitación de Responsabilidad</h2>
                    <p>
                    El autor no se hace responsable por:
                    </p>
                    <ul>
                    <li>Daños indirectos derivados del uso del sitio,</li>
                    <li>Contenido en enlaces externos.</li>
                    <li>Interrupciones en el servicio por causas ajenas a su control.</li>
                    </ul>
                </section>
            </Card>
        </Container>
        
    );
};

export default Terms;