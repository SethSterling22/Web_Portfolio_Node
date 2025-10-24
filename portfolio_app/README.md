<!-- // Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001 -->

# React + Vite

Se reusó el README que viene incorporado con Vite para crear este. Implementó el bono de Encriptar la contraseña, del mismo modo, se intentó implementar
el bono de "Contact Me", pero dadas las instrucciones, no sé si cumpla los requerimientos, de modo tal que si no los cumple, pido por favor que no se
considere y se tome en cuenta el de Encriptar contraseña.


# ¿Cómo correr la aplicación?

* Antes de ejecturar el programa, debe tener las siguientes dependencias:
    * node v23.9.0
    * vite 6.2.4
    * sass 1.86.1
    * sass-embedded 1.86.0
    * react 19.0.0
    * react-bootstrap 2.10.9
    * axios 1.9.0
    * (Véase más en el apartado de dependencias)


Debe ubicarse en el directorio raíz de la aplicación (myapp) y ejecutar el comando:

````bash
npm start
````

El cual ejecutará la aplicación, la misma podrá consumirse usando "http://localhost:3000" o usando "https://aery.stegosaurus-panga.ts.net/"
para acceder a la página alojada (Esperando que el servidor esté arriba).

*Al correr la aplicación, posiblemente note una alerta de migración, esta alerta no afecta el funcionamiento del programa*


# Apartados:

## Sin iniciar sesión:

- Página Welcome: Muestra de lo que trata el proyecto e insta a iniciar sesión

- Página de Iniciar sesión: Se puede iniciar sesión con correo electrónico y contraseña lo que genera un JWT y lo guarda en Storage, se hace REGEX del email. Comprueba
que el usuario no haya sido eliminado y permite el paso.

- Perfil (Previsualización): Después de iniciar sesión y una vez cerrada sesión se quedará guardado el ID del usuario, con lo cual podrá ver su perfil sin poder editarlo.

- Registro: Ya se tenía un registro y se implementó, fue útil para las pruebas, se hace REGEX de la contraseña y el Email 

## Con Sesión iniciada:

- Principal: Se muestran las habilidades del usuario, las cuales puede editar, eliminar y añadir.

- Educación: Se muestra la educación del usuario, las cuales puede editar, eliminar y añadir. Del mismo modo, se agregó el DropDown de los Degrees.

- Perfil: Se muestra el perfil del usuario con posibilidad de editarlo y eliminarlo.

- Experiencia: Muestra las experiencias que ha tenido el usuario y realiza la diferencia si ha sido Trabajo / Internado, Proyecto o Curso, Estas mismas permiten
ser editadas, añadidas y eliminadas.

- Cerrar Sesión: Elimina el JWT y desautentica al usuario, redirige a Login y deja el ID del usuario para la previsualización del perfil.

- Contacto: El contact se interpretó como enviarle un mensaje a alguien a través de su correo electrónico, esa persona recibirá el mensaje y podrá eliminarlo, pues
es el destinatario.

- EasterEgg: /easterEgg

# Paleta de colores y estilos

Me inspiré y basé muchos estilos de: https://getbootstrap.com/docs/5.3/getting-started/introduction/

Utilicé imágenes de alojadas en mi servidor para no resubirlas, menos la necesaria en la página de inicio.

Me basé en la paleta de colores con tonalidades verdozas llamada "Northern Lights" para variar el gris que me gusta, la cual contiene:

* #164773 (azul claro)
* #0B2B40 (azul oscuro)
* #1E5959 (verde azulado)
* #3B8C6E (verde oscuro)
* #89D99D (verde menta)

# Referencias 

Este proyecto fue hecho en parte gracias a la profesora Yaira K. Rivera Sánchez, La clase de API, Kirby, Internet y las siguientes referencias:

## Videos:

- Register: https://www.youtube.com/watch?v=X3qyxo_UTR4
- Login: https://www.youtube.com/watch?v=nI8PYZNFtac
- Login: https://www.youtube.com/watch?v=ZEB3VCbXQHA&list=PL82C6-O4XrHcJhPkcWkzFnjEBiAtpWGrw
- Bootstrap: https://getbootstrap.com/docs/5.3
- Estilos: https://www.w3schools.com/css/


# Dependencias:
 
  +-- @eslint/js@9.21.0
  +-- @types/bootstrap@5.2.10
  +-- @types/react-dom@19.0.4
  +-- @types/react@19.0.10
  +-- @vitejs/plugin-react@4.3.4
  +-- axios@1.9.0
  +-- bootstrap-icons@1.11.3
  +-- bootstrap@5.3.3
  +-- eslint-plugin-react-hooks@5.1.0
  +-- eslint-plugin-react-refresh@0.4.19
  +-- eslint@9.21.0
  +-- globals@15.15.0
  +-- jwt-decode@4.0.0
  +-- lucide-react@0.511.0
  +-- react-bootstrap@2.10.9
  +-- react-dom@19.0.0
  +-- react-router-dom@7.6.0
  +-- react@19.0.0
  +-- sass-embedded@1.86.0
  +-- sass@1.86.1
  `-- vite@6.3.5

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




