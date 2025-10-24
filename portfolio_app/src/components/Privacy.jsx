// Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001

import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {

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
                <h1 className="mb-4">Política de Privacidad 🧐</h1>
                
                <section className="mb-3">
                    <h2>1. Información que Recopilamos</h2>
                    <p>
                    Podemos recopilar información cuando:
                    </p>
                    <ul>
                        <li>Te suscribes al Periódico.</li>
                        <li>Se envía un mensaje a través del formulario de contacto.</li>
                    </ul>
                </section>

                <section className="mb-3">
                    <h2>2. Uso de la Información</h2>
                    <p>
                    La información recopilada se utiliza para:
                    </p>
                    <ul>
                        <li>Responder a consultas.</li>
                        <li>Estafar a otras personas en tu nombre.</li>
                    </ul>
                </section>

                <section className="mb-3">
                    <h2>3. Protección de Datos</h2>
                    <p>
                    Implementamos medidas de seguridad para proteger tu información:
                    </p>
                    <ul>
                        <li>Encriptación de datos sensibles.</li>
                        <li>Acceso restringido a la información.</li>
                        <li>Almacenamiento seguro en servidores protegidos.</li>
                    </ul>
                </section>

                <section className="mb-3">
                    <h2>4. Cookies y Tecnologías Similares</h2>
                    <p>
                    Este sitio utiliza cookies para:
                    </p>
                    <ul>
                        <li>Análisis de tráfico anónimo.</li>
                        <li>Recordar las preferencias del usuario.</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Tus Derechos</h2>
                    <p>
                    Tienes derecho a:
                    </p>
                    <ul>
                        <li>Solicitar acceso a sus datos.</li>
                        <li>Verificar si la información incorrecta.</li>
                        <li>Solicitar la eliminación de tus datos.</li>
                    </ul>
                </section>
            </Card>
        </Container>
    );
};

export default Privacy;