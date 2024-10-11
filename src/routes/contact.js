const express = require('express');
const router = express.Router();
const db = require('../db');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Límite de solicitudes al formulario de contacto
const contactFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo de 5 solicitudes por IP
    message: 'Has enviado demasiadas solicitudes. Inténtalo más tarde.'
});

// Ruta para el formulario de contacto (enviar datos)
router.post('/', contactFormLimiter, [
    // Validaciones usando express-validator
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio').escape(),
    body('phone').trim().isNumeric().withMessage('El teléfono debe ser numérico').escape(),
    body('address').trim().notEmpty().withMessage('La dirección es obligatoria').escape(),
    body('email').isEmail().withMessage('El correo electrónico no es válido').normalizeEmail(),
    body('source').trim().notEmpty().withMessage('La fuente es obligatoria').escape(),
], (req, res) => {

    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, address, email, source } = req.body;

    // Inserción en la base de datos usando parámetros preparados
    const query = 'INSERT INTO contact_forms (name, phone, address, email, source, created_at) VALUES (?, ?, ?, ?, ?, NOW())';

    db.query(query, [name, phone, address, email, source], (err, results) => {
        if (err) {
            console.error('Error al insertar en la base de datos: ', err);
            return res.status(500).json({ error: 'Error al enviar el formulario. Inténtalo más tarde.' });
        }

        // Respuesta exitosa
        res.status(201).json({ message: 'Formulario enviado correctamente', id: results.insertId });
    });
});

// Ruta para obtener las solicitudes de contacto (contact forms)
// Aquí cambiamos la ruta a '/contact', sin la repetición
router.get('/', (req, res) => { // Cambio aquí, eliminamos la segunda '/contact'
    const query = 'SELECT name, phone, address, email, source FROM contact_forms ORDER BY created_at DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los datos: ', err);
            return res.status(500).json({ error: 'Error al obtener las solicitudes. Inténtalo más tarde.' });
        }

        res.status(200).json({ contactPetitions: results });
    });
});

module.exports = router;
