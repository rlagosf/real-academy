const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, validationResult } = require('express-validator');

// Ruta para agregar personal al staff
router.post('/', [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio').escape(),
    body('rut').trim().notEmpty().withMessage('El RUT es obligatorio').escape(),
    body('address').trim().notEmpty().withMessage('La dirección es obligatoria').escape(),
    body('phone').trim().isNumeric().withMessage('El teléfono debe ser numérico').escape(),
    body('email').isEmail().withMessage('El correo electrónico no es válido').normalizeEmail(),
    body('occupation').trim().notEmpty().withMessage('La ocupación es obligatoria').escape(),
], (req, res) => {
    
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, rut, address, phone, email, occupation } = req.body;

    // Inserción en la base de datos
    const query = `INSERT INTO staff_academy (name, rut, address, phone, email, occupation, created_at) 
                   VALUES (?, ?, ?, ?, ?, ?, NOW())`;
    db.query(query, [name, rut, address, phone, email, occupation], (err, results) => {
        if (err) {
            console.error('Error al insertar en la base de datos: ', err);
            return res.status(500).json({ error: 'Error al agregar el personal. Inténtalo más tarde.' });
        }
        res.status(201).json({ message: 'Personal agregado correctamente', id: results.insertId });
    });
});

// Ruta para obtener los miembros del staff
router.get('/', (req, res) => {
    // Consulta SQL para obtener todos los miembros del staff
    const query = 'SELECT name, rut, address, phone, email, occupation FROM staff_academy ORDER BY created_at DESC';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los datos: ', err);
            return res.status(500).json({ error: 'Error al obtener los miembros del staff. Inténtalo más tarde.' });
        }

        // Si la consulta es exitosa, devolvemos los resultados
        res.status(200).json({ staffMembers: results });
    });
});

module.exports = router;
