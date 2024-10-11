const express = require('express');
const connection = require('../db'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Endpoint para obtener todos los estudiantes
router.get('/', (req, res) => {
    connection.query('SELECT * FROM subscribed_kids', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de alumnos' });
        }
        res.json(results);
    });
});

// Ruta para agregar un nuevo estudiante
router.post('/', [
    // Validaciones
    // (trim, notEmpty, etc. para los diferentes campos)
], (req, res) => {
    const { name, rut, address, weight, height, age, football_position, category_id } = req.body;
    const query = `
        INSERT INTO subscribed_kids (name, rut, address, weight, height, age, football_position, category_id, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    connection.query(query, [name, rut, address, weight, height, age, football_position, category_id], (err, result) => {
        if (err) {
            console.error('Error al insertar el estudiante:', err);
            return res.status(500).json({ message: 'Error al insertar el estudiante' });
        }
        res.status(201).json({ message: 'Estudiante agregado exitosamente' });
    });
});

// Ruta para eliminar un estudiante
router.delete('/:rut', (req, res) => {
    const { rut } = req.params;
    const query = 'DELETE FROM subscribed_kids WHERE rut = ?';
    connection.query(query, [rut], (error, result) => {
        if (error) {
            console.error('Error al eliminar el estudiante:', error);
            return res.status(500).json({ message: 'Error al eliminar el estudiante' });
        }
        res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    });
});

module.exports = router;
