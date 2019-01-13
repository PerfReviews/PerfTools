# PerfTools Lighthouse Report

Script para generar reportes de Lighthouse

### Requisitos

- Node.js 8 y npm 6

### Instrucciones de uso

Clonar el repositorio.

```sh
& git clone git@github.com:PerfReviews/PerfTools.git
```

Entrar en la carpeta `Lighthouse-Report` y ejecutar:

```sh
$ npm install
```

Ejecutar `node index.js` para generar los reportes de los sites definidos en el archivo [`data.js`](./data.js).

En la carpeta `reports` encontrás los reportes en formato `.json` y .`html`.

> Dejamos a elección del usuario si quiere utilizar un servidor para visualizar los resultado.