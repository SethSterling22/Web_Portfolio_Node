<!-- // Sebastián Hernández Sterling 801 - 21 -1038
// Yaira K. Rivera Sánchez
// CCOM4995-001 -->

# Node + Express API

De haber algún error en el programa, he de culpar al apagón del miércoles 16 de abril, si el programa ejecuta algo que no se programó con esa finalidad
pero que no afecta su funcionamiento de manera negativa, se hace la bienvenida a que este sea percibido como un Feature y no como un Bug 

## ¿Cómo correr la aplicación?

-  Antes de ejecturar el programa, su entorno debe de poseer las siguientes dependencias:
    * bcryptjs@3.0.2
    * cors@2.8.5
    * jsonwebtoken@9.0.2
    * morgan@1.10.0
    * swagger-ui-express@5.0.1
    * swagger-autogen@2.23.7

    * dotenv@16.5.0
    * express-validator@7.2.1
    * express@5.1.0
    * mssql@11.0.1  

    (Véase más información en la sección de Referencias... )

Debe ubicarse en el directorio /src de la aplicación (api) y ejecutar el comando:

```bash
node server.js
```

El cual ejecutará la aplicación, la misma podrá consumirse usando "http://localhost:3001/api/v1/" (si se ejectura de manera local) 
o usando "https://aery.stegosaurus-panga.ts.net/api/v1/" y agregando para realizar las solicitudes de API de manera remota con
SSL (Esperando que el servidor esté arriba).

Se realizó una implementación de Swagger que se puede ver mediante el siguiente link: "http://aeryserver.ddns.net:2149". Nótese que es HTTP :^)


## Uso:

Se hicieron todas las pruebas utilizando el comando "Curl".
Para poder consumir el programa deberá realizar unas ciertas solicitudes específicas de las cuales exhorto que se siga el siguiente formato:


- Autorización:

```bash
# Login para obtener el token
curl -X POST http://localhost:3001/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"example@example.com","password":"123456"}'\
-H "X-Api-Key: API_KEY"
```


- Manejo de Usuarios:

```bash
# Obtener el usuario por el Id:
curl -X GET http://localhost:3001/api/v1/users/{userId}\
-H "X-Api-Key: API_KEY"

# Crear un nuevo usuario con rol "user" (por defecto):
curl -X POST http://localhost:3001/api/v1/users \
-H "Content-Type: application/json" \
-d '{"email":"example1@example.com","password":"123456","firstName":"example","lastName":"example"}'\
-H "X-Api-Key: API_KEY"

# Editar el usuario por el Id:
curl -X PUT http://localhost:3001/api/v1/users/{userId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-d '{"email":"example1@example.com","password":"123456","firstName":"example","lastName":"example"}'\
-H "X-Api-Key: API_KEY"

# Eliminar el usuario por el Id:
curl -X DELETE http://localhost:3001/api/v1/users/{userId} \
-H "Authorization: Bearer <BEARER_TOKEN>"\
-H "X-Api-Key: API_KEY"
```


<!-- ################################# EDITAR CAMPOS ################################# -->
- Manejo de Habilidades:

```bash
# Obtener las habilidades de un usuario específico:
curl -X GET http://localhost:3001/api/v1/skills/{userId} \
-H "X-Api-Key: API_KEY"

# Crear una habilidad específica a un usuario:
curl -X POST http://localhost:3001/api/v1/skills/{userId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-d '{"name":"JavaScript","proficiency":"example"}' \
-H "X-Api-Key: API_KEY"

# Editar la habilidad específica de un usuario:
curl -X PUT http://localhost:3001/api/v1/skills/{userId}/{skillId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-d '{"name":"JavaScript","proficiency":"example"}' \
-H "X-Api-Key: API_KEY"

# Eliminar la habilidad específica de un ususario:
curl -X DELETE http://localhost:3001/api/v1/skills/{userId}/{skillId} \
-H "Authorization: Bearer <BEARER_TOKEN>"  \
-H "X-Api-Key: API_KEY"
```


- Manejo de Proyectos y Experiencia:

```bash
# Obtener los proyectos o experiencia por usuario
curl -X GET http://localhost:3001/api/v1/experiences/{userId} \
-H "X-Api-Key: API_KEY" 

# Crear un proyecto o experiencia a un usuario específico
curl -X POST http://localhost:3001/api/v1/experiences/{userId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-d '{"jobTitle":"student","company":"example","description":"API project","startDate":"2020-01-01","endDate":"2025-04-29","isProject":"true"}'\
-H "X-Api-Key: API_KEY"

# Editar el proyecto o experiencia específica de un usuario
curl -X PUT http://localhost:3001/api/v1/experiences/{userId}/{experienceId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-d '{"jobTitle":"student","company":"example2","description":"API project","startDate":"2020-01-01","endDate":"2025-04-29","isProject":"true"}'\
-H "X-Api-Key: API_KEY"

# Eliminar el proyecto o experiencia específica de un usuario
curl -X DELETE http://localhost:3001/api/v1/experiences/{userId}/{experienceId} \
-H "Authorization: Bearer <BEARER_TOKEN>"\
-H "X-Api-Key: API_KEY"
```


- Manejo de Educación:

```bash
# Obtener la información educativa de un usuario específico 
curl -X GET http://localhost:3001/api/v1/educations/{userId}\
-H "X-Api-Key: API_KEY"

# Crear la información educativa de un usuario específico
curl -X POST http://localhost:3001/api/v1/educations/{userId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-d '{"institution":"UPPRRP","degreeId":"1","fieldOfStudy":"Software Engineering","startDate":"2015-09-01","endDate":"2019-06-30"}'\
-H "X-Api-Key: API_KEY"

# Editar la información educativa específica de un usuario 
curl -X PUT http://localhost:3001/api/v1/educations/{userId}/{educationId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <YOUR_TOespecífico KEN>" \
-d '{"institution":"UPPRRP","degreeId":"1","fieldOfStudy":"Software Engineering","startDate":"2015-09-01","endDate":"2019-06-30"}'\
-H "X-Api-Key: API_KEY"

# Eliminar la información educativa específica de un usuario 
curl -X DELETE http://localhost:3001/api/v1/educations/{userId}/{educationId} \
-H "Authorization: Bearer <BEARER_TOKEN>"\
-H "X-Api-Key: API_KEY"
```


- Solicitar Contacto:

```bash
# Obtener el portafolio completo de un usuario específico
curl -X GET http://localhost:3001/api/v1/contacts/{userId}\
-H "X-Api-Key: API_KEY"

# Crear un nuevo contacto y envía un mensaje
curl -X POST http://localhost:3001/api/v1/contacts/{userId} \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <BEARER_TOKEN>" \
-d '{"email":"example@example.com","Message":"mensaje de ejemplo"}'\
-H "X-Api-Key: API_KEY"

# Eliminar el mensaje del usuario
curl -X DELETE http://localhost:3001/api/v1/contacts/{userId}/{ContactId} \
-H "Authorization: Bearer <BEARER_TOKEN>"\
-H "X-Api-Key: API_KEY"
```

- Solicitar Portafolio:

```bash
# Obtener el portafolio completo de un usuario específico
curl -X GET http://localhost:3001/api/v1/portfolio/{userId}\
-H "X-Api-Key: API_KEY"
```




<!-- ################################# EDITAR CAMPOS ################################# -->

# Referencias 

Este proyecto fue hecho en parte gracias a la profesora Yaira K. Rivera Sánchez, La clase de API, Internet y las siguientes referencias:

## Videos:

- Uso de Curl: https://www.youtube.com/watch?v=n3NtrQYrjDw&t=1s

- Token: https://www.youtube.com/watch?v=UBUNrFtufWo

- REST API: https://www.youtube.com/watch?v=-MTSQjw5DrM

- REST API: https://www.youtube.com/watch?v=pKd0Rpw7O48

- REST API: https://www.youtube.com/watch?v=BImKbdy-ubM


## Uso de paquetes:

- Morgan: https://www.npmjs.com/package/morgan

- bcriptjs: https://www.npmjs.com/package/bcryptjs

- jsonwebtoken: https://www.npmjs.com/package/jsonwebtoken

- cors: https://www.npmjs.com/package/cors

- helmet: https://www.npmjs.com/package/helmet

- swagger-autogen: https://www.npmjs.com/package/swagger-autogen







