// routes/student.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, validationResult } = require('express-validator');

// Ruta para agregar un nuevo estudiante
router.post('/', [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio').escape(),
    body('rut').trim().notEmpty().withMessage('El RUT es obligatorio').escape(),
    body('address').trim().notEmpty().withMessage('La dirección es obligatoria').escape(),
    body('weight').isNumeric().withMessage('El peso debe ser numérico').escape(),
    body('height').isNumeric().withMessage('La estatura debe ser numérica').escape(),
    body('age').isNumeric().withMessage('La edad debe ser numérica').escape(),
    body('football_position').trim().notEmpty().withMessage('La posición es obligatoria').escape(),
    body('category_id').trim().notEmpty().withMessage('La categoría es obligatoria').escape(),
], (req, res) => {
    // Validación de errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, rut, address, weight, height, age, position, category } = req.body;

    // Consulta de inserción en la base de datos
    const query = `INSERT INTO subscribed_kids 
                   (name, rut, address, weight, height, age, football_position, category_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, rut, address, weight, height, age, position, category], (err, results) => {
        if (err) {
            console.error('Error al insertar en la base de datos: ', err);
            return res.status(500).json({ error: 'Error al agregar el estudiante. Inténtalo más tarde.' });
        }

        // Respuesta exitosa
        res.status(201).json({ message: 'Estudiante agregado correctamente', id: results.insertId });
    });
});

module.exports = router;
