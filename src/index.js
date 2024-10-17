require('dotenv').config();  // Cargar variables de entorno

const express = require('express');
const cors = require('cors');
const helmet = require('helmet').default;  // Importar helmet correctamente para versiones recientes
const contactRoutes = require('./routes/contact');
const studentRoutes = require('./routes/student');
const staffRoutes = require('./routes/staff');
const userRoutes = require('./routes/user');
const dataRoutes = require('./routes/data');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Usar helmet con configuraciones específicas para CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://maps.googleapis.com"],
      objectSrc: ["'none'"],
      frameSrc: ["'self'", "https://www.google.com"],
    },
  },
}));

app.use('/api/contact', contactRoutes); 
app.use('/api/student', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/user', userRoutes);
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
  //console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
