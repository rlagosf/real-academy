const express = require('express');
const connection = require('../db'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Endpoint para obtener todos los miembros del staff
router.get('/', (req, res) => {
    connection.query('SELECT * FROM staff_academy ORDER BY created_at DESC', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta del staff' });
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo miembro del staff
router.post('/', [
    // Aquí irían las validaciones necesarias, como en el modelo que enviaste
], (req, res) => {
    const { name, rut, address, phone, email, occupation } = req.body;
    const query = `
        INSERT INTO staff_academy (name, rut, address, phone, email, occupation, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    connection.query(query, [name, rut, address, phone, email, occupation], (err, result) => {
        if (err) {
            console.error('Error al insertar el personal:', err);
            return res.status(500).json({ message: 'Error al insertar el personal' });
        }
        res.status(201).json({ message: 'Personal agregado exitosamente' });
    });
});

// Ruta para eliminar un miembro del staff
router.delete('/:rut', (req, res) => {
    const { rut } = req.params;
    const query = 'DELETE FROM staff_academy WHERE rut = ?';
    connection.query(query, [rut], (error, result) => {
        if (error) {
            console.error('Error al eliminar el personal:', error);
            return res.status(500).json({ message: 'Error al eliminar el personal' });
        }
        res.status(200).json({ message: 'Personal eliminado exitosamente' });
    });
});

module.exports = router;
