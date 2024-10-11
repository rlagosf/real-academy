const express = require('express');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
const studentRoutes = require('./routes/student');
const staffRoutes = require('./routes/staff');
const userRoutes = require('./routes/user');
const dataRoutes = require('./routes/data');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes); // Aquí no cambian las rutas
app.use('/api/student', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/user', userRoutes);
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
