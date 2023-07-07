<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# test coverage -> generates a folder with the report and an index.html to better view the report
$ yarn run test:cov
```

<h2>Visión General</h2>
<p>El proyecto se basa en una estructura de módulos siguiendo la filosofía del DDD (Domain-Driven Design). Estos cuatro módulos representan conceptos del negocio, en este caso, asumamos una aplicación de comidas que utiliza la información de los usuarios para ofrecer recomendaciones efectivas de productos. Cada módulo contiene subcapas importantes, como:</p>
<ul>
  <li><strong>Entities:</strong> Define todo lo relacionado a la entidad, desde interfaces hasta modelos.</li>
  <li><strong>DTOs:</strong> Data Transfer Objects.</li>
  <li><strong>Controller:</strong> Controladores.</li>
  <li><strong>Servicios:</strong> Lógica de negocio y servicios relacionados.</li>
  <li><strong>Archivo de declaración del módulo.</strong></li>
</ul>
<p>Al finalizar este documento, se proporcionarán precisiones sobre la arquitectura y diseño del sistema que son consideradas importantes.</p>

<h2>Detalle de Capa User</h2>
<p>Este módulo se enfoca en la creación de una cuenta de usuario para mejorar la calidad de las recomendaciones. No se persigue la autenticación ni autorización de servicios, sino la individualización para brindar mejor información. La estructura típica de la información de usuario es la siguiente:</p>
<pre>
{
  "preferences": [
    {
      "type": "cuisine",
      "value": "Comida China"
    },
    {
      "type": "ingredients",
      "value": "arroz"
    },
    {
      "type": "ingredients",
      "value": "pescado"
    }
  ],
  "id": "hashkey",
  "name": "Nombre del Usuario A"
}
</pre>
<p>El campo "preferences" brinda información valiosa para el algoritmo de recomendaciones. Nótese que los valores "type" y "value" son strings y, en un entorno real, deberían estar normalizados como códigos de identificación para mejorar las consultas a bases de datos y la integridad de la información.</p>

<h3>Servicio de Interactions</h3>
<p>En la capa de usuario existe otro servicio llamado Interactions. Este servicio registra eventos de interacción del usuario con productos o restaurantes. Un ejemplo típico de información registrada sería:</p>
<pre>
{
  "valueInteraction": 1,
  "typeInteraction": "view",
  "id_element": "fe30d956-f7d7-4308-a444-e6745e810f76",
  "id": "4c23b374-de78-4945-9fb5-cb52aaadcdd1",
  "typeElement": "meal",
  "id_usuario": "e6ac35ca-559d-47ea-8040-cfebfb8a4e9b"
}
</pre>
<p>Estos datos son importantes para hacer recomendaciones con filtrado colaborativo. Cada evento se guarda por separado y se utiliza el id del usuario como clave secundaria para mejorar el rendimiento en las consultas.</p>

<h2>Detalle de Capa Restaurante</h2>
<p>Esta capa existe para agregar restaurantes y sus respectivas comidas. El modelo de datos de restaurante típicamente se ve así:</p>
<pre>
{
  "location": "Ciudad XYZ",
  "cuisineType": "Comida Americana",
  "id": "6f354893-a308-49f7-b121-c0ce6693b826",
  "name": "Restaurante A"
}
</pre>
<p>La propiedad "cuisineType" se utilizará para el filtrado basado en contenido.</p>

<h3>Detalle de Capa Comida</h3>
<p>La estructura típica de un objeto JSON en la capa de comida es la siguiente:</p>
<pre>
{
  "description": "Deliciosa hamburguesa con queso",
  "ingredients": [
    "Carne de res",
    "Pan",
    "Queso",
    "Lechuga",
    "Tomate"
  ],
  "id": "hashkey",
  "price": "10",
  "name": "Hamburguesa",
  "restaurantId": "6f354893-a308-49f7-b121-c0ce6693b826"
}
</pre>
<p>La información contenida en este objeto será de utilidad al calcular las mejores recomendaciones de productos.</p>

<h2>Detalles de Despliegue</h2>
<p>Para el despliegue, se configuró una instancia EC2 con Jenkins y otra instancia para SonarQube. Al hacer un push o PR a la rama principal del proyecto, Jenkins valida la calidad del código con SonarQube y, si pasa la evaluación, lo despliega en otra instancia EC2. A continuación, se proporcionan los datos de acceso:</p>

<h3>Jenkins</h3>
<p>Jenkins es una herramienta de integración continua utilizada en el proyecto. Permite automatizar el proceso de construcción, prueba y despliegue del software.</p>
<p>URL de Jenkins: <a href="http://ec2-44-201-238-197.compute-1.amazonaws.com:8080" target="_blank" rel="noopener noreferrer">http://ec2-44-201-238-197.compute-1.amazonaws.com:8080</a></p>
<p>Datos de acceso:</p>
<ul>
  <li>Usuario: amaris</li>
  <li>Contraseña: SomeNotSecurePassword</li>
</ul>

<h3>SonarQube</h3>
<p>SonarQube es una plataforma para evaluar la calidad del código. Proporciona métricas y análisis estático para identificar posibles problemas y vulnerabilidades en el código fuente.</p>
<p>URL de SonarQube: <a href="http://ec2-44-206-250-56.compute-1.amazonaws.com:9000" target="_blank" rel="noopener noreferrer">http://ec2-44-206-250-56.compute-1.amazonaws.com:9000</a></p>
<p>Datos de acceso:</p>
<ul>
  <li>Usuario: admin</li>
  <li>Contraseña: SomeNotSecurePassword</li>
</ul>

<h3>API <a href="https://www.postman.com/crimson-eclipse-5483/workspace/amaris-test/collection/5625566-f10e6ce6-5e46-4f85-8046-ff394b52368f?action=share&creator=5625566" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #33AA5E; color: #FFFFFF; font-size: 14px; height: 40px; width: 80px; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 4px; border: none; cursor: pointer;">Run in Postman</a></h3>

<p>La API es la parte central del proyecto NestJS y proporciona la funcionalidad principal del sistema.</p>
<p>URL de acceso a la API: <a href="http://ec2-44-201-221-33.compute-1.amazonaws.com:3000" target="_blank" rel="noopener noreferrer">http://ec2-44-201-221-33.compute-1.amazonaws.com:3000</a></p>

<h2>Detalles Técnicos Deseados</h2>
<p>En el proyecto se incluyeron patrones de desarrollo como SOLID y se generaron

pruebas unitarias para las partes más importantes del código. Se mantuvo la modularidad y cohesión con bajo acoplamiento. También se tuvo en cuenta la complejidad algorítmica (Big O) y se buscó mantenerla lo más baja posible para mejorar el rendimiento del código.



<p> <b>Algunos aspectos a mejorar son los siguientes</b>: <br></br>
 debido a limitaciones de tiempo, no se pudieron implementar todos los features deseados. Por ejemplo, el patrón de desarrollo utilizado no se considera ideal para este proyecto. Dado que una parte se basa en eventos (eventos de interacción, que pueden ser masivos) y otra en tráfico de datos más reducido, se sugiere una estructura hexagonal con el patrón de repositorio. La ventaja de una arquitectura hexagonal es que permite una división clara en capas y comunicación a través de puertos, lo que facilita la escalabilidad y el orden en comparación con un diseño rústico de DDD, donde las interacciones coexisten en la capa de usuarios a pesar de las enormes diferencias de funcionamiento e implementación. Dividir esta implementación en capas sería lo ideal. En cuanto al patrón de repositorio, es importante aislar las consultas a la base de datos en una capa independiente en términos de uso y optimización, especialmente debido a la gran cantidad de datos manejados por la aplicación. Separar las consultas ayuda a optimizar y realizar pruebas de manera más efectiva. Otro aspecto considerado fue el caching. Debido a los cálculos complejos que se realizan, se sugiere almacenar parte de la información en una caché, preferiblemente utilizando Redis, y actualizarla en base a eventos, ya que esto es una parte importante del negocio.</p>

<h3>Algoritmo de Recomendación</h3> <br></br>
El algoritmo de recomendación implementado en esta aplicación utiliza una combinación de técnicas de filtrado basado en contenido y filtrado colaborativo para generar recomendaciones personalizadas para los usuarios. El objetivo es ofrecer sugerencias relevantes de restaurantes y comidas basadas en las preferencias y gustos del usuario.

<b>Filtrado basado en contenido</b> <br></br>
El filtrado basado en contenido es una técnica que utiliza las características y atributos de los elementos para hacer recomendaciones. En este caso, se utiliza para calcular la similitud entre las preferencias del usuario y los restaurantes/comidas disponibles.

Paso 1: Obtención de preferencias del usuario <br></br>
Antes de realizar las recomendaciones, se extraen las preferencias del usuario. Estas preferencias pueden incluir información sobre el tipo de cocina que le gusta, los ingredientes que prefiere, las restricciones dietéticas, etc.

Paso 2: Creación de un mapa de ingredientes por comida <br></br>
Se crea un mapa que asocia cada comida con sus ingredientes correspondientes. Esto permite una búsqueda eficiente de los ingredientes cuando se calcula la similitud entre las preferencias y las comidas.

Paso 3: Cálculo de la similitud entre preferencias y restaurantes <br></br>
Para cada restaurante, se calcula la similitud entre las preferencias del usuario y el restaurante en función de varios criterios, como el tipo de cocina y los ingredientes de las comidas ofrecidas por el restaurante. Tanto la similitud del restaurante como la similitud de las comidas con las preferencias del usuario suman puntos. Al final, los resultados se ordenan de mayor a menor puntaje de similitud, basándose en el tipo de comida que ofrece el restaurante, el nombre de la comida y los ingredientes. Cada aspecto suma puntos.

Paso 4: Cálculo de la similitud entre preferencias y comidas <br></br>
Similar al paso anterior, se calcula la similitud entre las preferencias del usuario y cada comida disponible. Se considera la presencia de ingredientes en la comida que coincidan con las preferencias del usuario. El cálculo es muy similar al anterior, pero en este caso no se tiene en cuenta el peso de similitud del restaurante.

<b>Filtrado colaborativo</b> <br></br>
El filtrado colaborativo es otra técnica utilizada en el algoritmo de recomendación. Se basa en el comportamiento y las elecciones de otros usuarios para hacer recomendaciones.

Paso 1: Obtención de datos de interacciones del usuario y sus preferencias preestablecidas. <br></br>
Paso 2: Obtención de información de interacciones de otros usuarios. <br></br>
Paso 3: Cálculo de los usuarios más cercanos mediante el cálculo de cosenos y la elaboración de un perfil temporal que busca patrones de interacciones similares (nearest neighbors). Una vez encontrados los usuarios más cercanos, es decir, aquellos usuarios con gustos similares al usuario en cuestión, se buscan comidas o restaurantes frecuentados por esos usuarios pero que no hayan sido visitados por nuestro cliente. Una vez encontrados esos elementos, se devuelven en un array. La fortaleza de este algoritmo radica en su enfoque híbrido, ya que es capaz de recomendar productos basados en los gustos del usuario y, al mismo tiempo, impulsar la prueba de nuevos productos interesantes (exitosos en usuarios similares).

Baja complejidad algorítmica (Big O) <br></br>
El algoritmo implementado logra una baja complejidad algorítmica en la generación de recomendaciones gracias a varias optimizaciones.

Uso de estructuras de datos eficientes: Se utilizan mapas y conjuntos para almacenar y acceder a los datos de manera eficiente, lo que reduce el tiempo de búsqueda y comparación.
Búsqueda eficiente de ingredientes: Al crear un mapa de ingredientes por comida, se mejora la eficiencia al buscar los ingredientes necesarios para calcular la similitud.
Iteraciones optimizadas: El algoritmo utiliza bucles y estructuras de control para reducir la cantidad de iteraciones y evitar repeticiones innecesarias, mejorando así el rendimiento.
Uso de operaciones de suma: En lugar de realizar comparaciones exhaustivas entre todas las preferencias y los elementos disponibles, se utiliza un enfoque de suma para asignar puntos a las coincidencias, lo que simplifica el proceso y mejora la eficiencia.