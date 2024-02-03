# Login Web 3 con Metamask y ethersjs

Este proyecto está creado con el objetivo de mostrar como realizar un sistema de login usando Metamask y la cuenta de blockchain como método de autenticación.

**IMPORANTE!** Ya que hay un artículo de [Medium (Login Web 3)](https://raul-alhena.medium.com/login-web-3-con-metamask-y-ethers-js-b5dd9d38b803) relacionado, y para no hacerlo muy extenso, el proyecto se ha realizado con la configuración mínima necesaria para mostrar el proceso. En el caso que se quiera integrar en producción, es neceario implementar seguridad, tanto en el frontend como en el backend.

## Tecnologías

- React + Vite
- NestJS
- MongoDB
- Metamask

## Ejecución del proyecto

Para poder seguir los pasos de la configuración del entorno, accede al artículo: [Medium Login Web 3](https://raul-alhena.medium.com/login-web-3-con-metamask-y-ethers-js-b5dd9d38b803)

1. Clonar repositorio.

2. Instalación de dependencias, tanto en el cliente como el en servidor:

 ```bash
  npm install
```

3. Configuración de MongoDB y modificar la URL de acceso en el fichero: **__/server/src/app.module.ts__**

```typescript
  mongodb+srv://<user>:<password>@<atlas_cluster_identifier>/<database_name>
```
4. Instanciar cliente y servidor:

Cliente:

```bash
  npm run dev
```

Servidor: 

```bash
  npm run start ó npx nest start
```

## Contacto

raul.alhena@gmail.com