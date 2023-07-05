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

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

<!DOCTYPE html>
<html>

<body>
  <h1>Sobre el proyecto</h1>

  <h2>Jenkins</h2>
  <p>Jenkins es una herramienta de integración continua utilizada en este proyecto. Permite automatizar el proceso de construcción, prueba y despliegue del software.</p>
  <ul>
    <li>URL de Jenkins: <a href="http://ec2-44-201-238-197.compute-1.amazonaws.com:8080/">http://ec2-44-201-238-197.compute-1.amazonaws.com</a></li>
    <li>Datos de acceso:</li>
    <ul>
      <li>Usuario: amaris</li>
      <li>Contraseña: SomeNotSecurePassword</li>
    </ul>
  </ul>

  <h2>SonarQube</h2>
  <p>SonarQube es una plataforma para evaluar la calidad del código. Proporciona métricas y análisis estático para identificar posibles problemas y vulnerabilidades en el código fuente.</p>
  <ul>
    <li>URL de SonarQube: <a href="http://ec2-44-206-250-56.compute-1.amazonaws.com:9000/dashboard?id=Food-services">http://ec2-44-206-250-56.compute-1.amazonaws.com</a></li>
    <li>Datos de acceso:</li>
    <ul>
      <li>Usuario: admin</li>
      <li>Contraseña: SomeNotSecurePassword</li>
    </ul>
  </ul>

  <h2>API</h2>
  <p>La API es la parte central del proyecto NestJS y proporciona la funcionalidad principal del sistema.</p>
  <ul>
    <li>URL de acceso a la API: <a href="ec2-44-201-221-33.compute-1.amazonaws.com:3000">ec2-44-201-221-33.compute-1.amazonaws.com</a></li>
  </ul>

  <h2>Estructura del proyecto</h2>
  <p>El proyecto NestJS se divide en las siguientes capas:</p>
  <ol>
    <li>Capa de usuarios: Esta capa se encarga de gestionar la autenticación y autorización de los usuarios, así como la gestión de perfiles y roles.</li>
    <li>Capa de restaurantes: Aquí se encuentra la lógica relacionada con la gestión de restaurantes, como la creación, actualización y eliminación de restaurantes, así como la obtención de información detallada sobre ellos.</li>
    <li>Capa de recomendaciones: Esta capa se encarga de generar las recomendaciones personalizadas para los usuarios, utilizando el algoritmo de recomendación implementado.</li>
  </ol>

  <h2>Algoritmo de Recomendación</h2>
  <p>El algoritmo de recomendación implementado en esta aplicación utiliza una combinación de técnicas de filtrado basado en contenido y filtrado colaborativo para generar recomendaciones personalizadas para los usuarios. El objetivo es ofrecer sugerencias relevantes de restaurantes y comidas basadas en las preferencias y gustos del usuario.</p>

  <h3>Filtrado basado en contenido</h3>

  <p>El filtrado basado en contenido es una técnica que se basa en las características y atributos de los elementos para hacer recomendaciones. En este caso, se utiliza para calcular la similitud entre las preferencias del usuario y los restaurantes/comidas disponibles.</p>

  <h4>Paso 1: Obtención de preferencias del usuario</h4>

  <p>Antes de realizar las recomendaciones, se extraen las preferencias del usuario. Estas preferencias pueden incluir información sobre el tipo de cocina que le gusta, los ingredientes que prefiere, las restricciones dietéticas, etc.</p>

  <h4>Paso 2: Creación de un mapa de ingredientes por comida</h4>

  <p>Se crea un mapa que asocia cada comida con sus ingredientes correspondientes. Esto permite una búsqueda eficiente de los ingredientes cuando se calcula la similitud entre las preferencias y las comidas.</p>

  <h4>Paso 3: Cálculo de la similitud entre preferencias y restaurantes</h4>

  <p>Para cada restaurante, se calcula la similitud entre las preferencias del usuario y el restaurante en función de varios criterios, como el tipo de cocina y los ingredientes de las comidas ofrecidas por el restaurante. La similitud se calcula sumando puntos por cada criterio que coincida con las preferencias del usuario.</p>

  <h4>Paso 4: Cálculo de la similitud entre preferencias y comidas</h4>

  <p>Similar al paso anterior, se calcula la similitud entre las preferencias del usuario y cada comida disponible. Se considera la presencia de ingredientes en la comida que coincidan con las preferencias del usuario.</p>

  <h3>Filtrado colaborativo</h3>

  <p>El filtrado colaborativo es otra técnica utilizada en el algoritmo de recomendación. Se basa en el comportamiento y las elecciones de otros usuarios para hacer recomendaciones. Sin embargo, en esta implementación, el enfoque se centra principalmente en el filtrado basado en contenido.</p>

  <h3>Baja complejidad algorítmica</h3>

  <p>El algoritmo implementado logra una baja complejidad algorítmica en la generación de recomendaciones gracias a varias optimizaciones.</p>

  <ul>
    <li>Uso de estructuras de datos eficientes: Se utilizan mapas y conjuntos para almacenar y acceder a los datos de manera eficiente, lo que reduce el tiempo de búsqueda y comparación.</li>
    <li>Búsqueda eficiente de ingredientes: Al crear un mapa de ingredientes por comida, se mejora la eficiencia al buscar los ingredientes necesarios para calcular la similitud.</li>
    <li>Iteraciones optimizadas: El algoritmo utiliza bucles y estructuras de control para reducir la cantidad de iteraciones y evitar repeticiones innecesarias, mejorando así el rendimiento.</li>
    <li>Uso de operaciones de suma: En lugar de realizar comparaciones exhaustivas entre todas las preferencias y los elementos disponibles, se utiliza un enfoque de suma para asignar puntos a las coincidencias, lo que simplifica el proceso y mejora la eficiencia.</li>
  </ul>

  <h2>Conclusiones</h2>

  <p>El algoritmo de recomendación implementado en este proyecto NestJS combina técnicas de filtrado basado en contenido y filtrado colaborativo para generar recomendaciones personalizadas de restaurantes y comidas. Gracias a las optimizaciones y a una baja complejidad algorítmica, el algoritmo es capaz de ofrecer sugerencias relevantes y eficientes para los usuarios.</p>
</body>
</html>
