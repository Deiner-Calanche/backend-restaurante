# 🍽️ Backend Restaurante

Este es el backend de una aplicación de gestión para un restaurante, desarrollado con **Node.js**, **Express** y **MongoDB**. Proporciona una API RESTful para gestionar tipos de comida, proveedores, menús, alimentos y más.

---

## 🚀 Tecnologías

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv
- express-validator
- cors
- nodemailer (para envío de correos)
- SweetAlert2 (en frontend)

---

## 📁 Estructura del Proyecto



* /controllers # Lógica de negocio
* /db # Conexión a MongoDB
* /middlewares # Validaciones y control de errores
* /models # Modelos de Mongoose
* /routes # Rutas de la API REST
* /utils # Funciones auxiliares (como sendMail.js)
* index.js # Punto de entrada del servidor
* .env # Variables de entorno (NO subir)
* .gitignore # Archivos y carpetas excluidos del control de versiones

---
##  🛠️ Instalación
Clona el repositorio:

git clone https://github.com/Deiner-Calanche/backend-restaurante.git
cd backend-restaurante
Instala las dependencias:


npm install
Configura el archivo .env como se muestra arriba.

Inicia el servidor:

npm start

El servidor estará corriendo en:
http://localhost:3001
--
## 📬 Rutas API disponibles
/api/tipos → CRUD de tipos de comida

/api/proveedores → CRUD de proveedores

/api/categorias → CRUD de categorías

/api/menus → CRUD de menús

/api/alimentos → CRUD de alimentos

---
##  ✉️ Contacto
Desarrollado por Deiner David Calanche Villa
📧 deinercalanchevilla@hotmail.com
