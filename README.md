# 🍜 Restaurante Manila

## Descripción del proyecto

**Restaurante Manila** es una aplicación web desarrollada con Angular 17 que permite a los usuarios conocer la oferta gastronómica de un restaurante, consultar información sobre comidas y bebidas, y realizar pedidos de manera sencilla e intuitiva.

La aplicación consume servicios API para obtener la información de los productos disponibles, permitiendo visualizar sus características y facilitar la búsqueda mediante diferentes filtros.

Además, cuenta con un módulo de pedidos en el que los clientes pueden seleccionar los productos que desean adquirir, indicar sus cantidades y registrar sus datos personales para generar un comprobante del pedido en formato PDF.

El propósito del proyecto es ofrecer una experiencia de navegación organizada, agradable y funcional, aplicando conceptos de desarrollo frontend, consumo de APIs, componentes, servicios y organización de información.

## Objetivos

- Desarrollar una aplicación web utilizando Angular 17.
- Implementar una interfaz intuitiva y fácil de utilizar.
- Consumir servicios API para obtener información de comidas y bebidas.
- Facilitar la búsqueda y consulta de productos.
- Permitir la selección de múltiples productos para realizar pedidos.
- Generar un comprobante de pedido en formato PDF.

## Funcionalidades principales

### 1. Página de inicio

Presenta información general del Restaurante Manila, incluyendo:

- Presentación del restaurante.
- Carrusel de imágenes.
- Información sobre el establecimiento.
- Descripción de los servicios ofrecidos.
- Presentación del plato estrella.
- Presentación de la bebida estrella.

### 2. Módulo de comidas

Permite consultar los diferentes platos disponibles en el restaurante.

Sus funcionalidades incluyen:

- Visualización de comidas obtenidas mediante una API.
- Presentación del nombre, imagen e ingredientes de cada comida.
- Asignación de precios a los productos.
- Organización de comidas por categorías.
- Búsqueda de comidas por nombre.
- Búsqueda de comidas por ingredientes.

### 3. Módulo de bebidas

Permite consultar las bebidas disponibles en el restaurante.

Incluye:

- Visualización de bebidas mediante el consumo de una API.
- Presentación de las características de cada bebida.
- Búsqueda de bebidas por nombre.
- Consulta de información de las bebidas disponibles.

### 4. Módulo de pedidos

Permite seleccionar diferentes comidas y bebidas para construir un pedido.

Sus funcionalidades incluyen:

- Selección de múltiples comidas y bebidas.
- Asignación de cantidades a cada producto.
- Registro de los datos del cliente.
- Cálculo del subtotal de cada producto.
- Cálculo del valor total del pedido.
- Registro de la fecha del pedido.
- Generación de un comprobante descargable en formato PDF.

### 5. Módulo de navegación

Facilita el desplazamiento entre las diferentes secciones de la aplicación mediante una barra de navegación.

### 6. Pie de página (Footer)

Contiene información complementaria del restaurante y elementos de identificación de la aplicación.

### 7. Módulo de juego

Incluye una sección interactiva de entretenimiento dentro de la aplicación.

## Tecnologías utilizadas

El proyecto utiliza las siguientes tecnologías y herramientas:

| Tecnología | Descripción |
|---|---|
| Angular 17 | Framework utilizado para desarrollar la aplicación web. |
| TypeScript | Lenguaje de programación utilizado para implementar la lógica de la aplicación. |
| HTML5 | Lenguaje utilizado para estructurar el contenido. |
| CSS3 | Utilizado para diseñar y personalizar la interfaz. |
| Bootstrap | Framework utilizado para facilitar el diseño y la adaptación de la interfaz. |
| JavaScript | Lenguaje utilizado en funcionalidades de desarrollo web. |
| APIs REST | Servicios utilizados para obtener información de comidas y bebidas. |
| Git | Sistema de control de versiones. |
| GitHub | Plataforma para almacenar y gestionar el código fuente. |
| Vercel | Plataforma prevista para el despliegue de la aplicación. |

## Requisitos previos

Para ejecutar el proyecto en un entorno local es necesario contar con:

- Node.js compatible con Angular 17.
- npm (administrador de paquetes de Node.js).
- Angular CLI versión 17.
- Visual Studio Code o cualquier otro editor de código.
- Conexión a internet para consultar los servicios API.

## Instalación y configuración

Para obtener una copia del proyecto y ejecutarlo localmente, se deben seguir los siguientes pasos:

### 1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone URL_DEL_REPOSITORIO
```

Reemplazar `URL_DEL_REPOSITORIO` por la dirección del repositorio correspondiente.

### 2. Ingresar a la carpeta del proyecto

```bash
cd restaurante-manila
```

### 3. Instalar las dependencias

Ejecutar el siguiente comando:

```bash
npm install
```

Este comando instala las dependencias necesarias para ejecutar la aplicación.

### 4. Instalar Angular CLI

Si no se encuentra instalado Angular CLI versión 17, ejecutar:

```bash
npm install -g @angular/cli@17
```

### 5. Ejecutar el proyecto

Para iniciar el servidor de desarrollo, ejecutar:

```bash
ng serve
```

También se puede utilizar:

```bash
ng serve --open
```

La aplicación estará disponible en la siguiente dirección:

`http://localhost:4200/`

## Compilación del proyecto

Para generar la versión de producción de la aplicación, ejecutar:

```bash
ng build
```

Este comando compila el proyecto y genera los archivos necesarios para su posterior despliegue.

Los archivos generados se almacenan en la carpeta de salida configurada en `angular.json`, generalmente dentro de `dist/`.

## Estructura general del proyecto

La aplicación está organizada mediante componentes, servicios, modelos y archivos de configuración.

Una estructura general de referencia es la siguiente:

```text
restaurante-manila/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── bebidas/
│   │   ├── comidas/
│   │   ├── entidades/
│   │   ├── footer/
│   │   ├── formulario/
│   │   ├── inicio/
│   │   ├── juego/
│   │   ├── navegacion/
│   │   ├── pedido/
│   │   │
│   │   ├── servicios/
│   │   ├── modelos/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │
│   ├── index.html
│   └── styles.css
│
├── angular.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

**Nota:** La estructura es ilustrativa. Los nombres y directorios deben ajustarse a la organización real del proyecto.

## Consumo de servicios API

Restaurante Manila utiliza servicios para obtener información de comidas y bebidas desde fuentes externas.

Los servicios permiten realizar solicitudes HTTP para consultar los datos y posteriormente presentarlos en los diferentes componentes de la aplicación.

Entre las operaciones implementadas se contemplan:

- Obtener el listado de comidas.
- Consultar información de una comida por su nombre.
- Obtener el listado de bebidas.
- Consultar información de una bebida por su nombre.

La comunicación con los servicios se realiza mediante solicitudes HTTP, utilizando los mecanismos de consumo de APIs proporcionados por Angular.

## Despliegue de la aplicación

El proyecto está previsto para publicarse mediante **Vercel**, utilizando GitHub como repositorio del código fuente.

Los pasos generales para realizar el despliegue son:

1. Sub
