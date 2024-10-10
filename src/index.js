// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact'); // Importa las rutas de contacto
const studentRoutes = require('./routes/student'); // Importa las rutas de estudiantes
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear JSON

// Usar las rutas
app.use('/api/contact', contactRoutes); // Usa la ruta importada para manejar el formulario de contacto
app.use('/api/students', studentRoutes); // Usa la ruta para manejar el registro de estudiantes

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
