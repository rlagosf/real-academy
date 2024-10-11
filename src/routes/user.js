// routes/users.js
const express = require('express');
const router = express.Router();
const connection = require('../db');
const { body, validationResult } = require('express-validator');

// Endpoint para agregar un nuevo usuario
router.post('/', [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('username').trim().notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').trim().notEmpty().withMessage('La contraseña es obligatoria'),
    body('rol_id').isInt().withMessage('El rol es obligatorio y debe ser numérico')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, password, rol_id } = req.body;

    const query = `
        INSERT INTO users_academy (name, username, password, rol_id, created_at) 
        VALUES (?, ?, ?, ?, NOW())
    `;
    const values = [name, username, password, rol_id];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            return res.status(500).json({ message: 'Error al agregar usuario' });
        }
        res.status(201).json({ message: 'Usuario agregado exitosamente' });
    });
});

module.exports = router;
