import { Container } from 'react-bootstrap';

import kirby1 from '../assets/kirby1.jpg';
import kirby2 from '../assets/kirby2.jpg';
import kirby3 from '../assets/kirby3.jpg';
import kirby4 from '../assets/kirby4.jpg';
import kirby5 from '../assets/kirby5.jpg';
import kirby6 from '../assets/kirby6.jpg';

// Una página en agradecimiento a mi perrito que me ayuda a programar, si ve esto, agradecería que hiciera mención en la corrección :D
const EasterEgg = () => {
return (
    <Container className="py-5">
        <div className="row mt-5">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <img src={kirby1} className="w-100 shadow-1-strong rounded mb-4" alt="Kirby analítico" />
                <img src={kirby2} className="w-100 shadow-1-strong rounded mb-4" alt="kirby curioso" />
            </div>

            <div className="col-lg-4 mb-4 mb-lg-0"> <img src={kirby3} className="w-100 shadow-1-strong rounded mb-4" alt="kirby juguetón" />
                <img src={kirby4} className="w-100 shadow-1-strong rounded mb-4" alt="kirby cansado" />
            </div>

            <div className="col-lg-4 mb-4 mb-lg-0"> <img src={kirby5} className="w-100 shadow-1-strong rounded mb-4" alt="kirby feliz :D" />
                <img src={kirby6} className="w-100 shadow-1-strong rounded mb-4" alt="kirby durmiendo" />
            </div>
        </div>
    </Container>
    );
};

export default EasterEgg;