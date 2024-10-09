const express = require('express');
const router = express.Router();
const db = require('../db');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Límite de solicitudes al formulario de contacto
// @ts-ignore
const contactFormLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Máximo de 5 solicitudes por IP
    message: 'Has enviado demasiadas solicitudes. Inténtalo más tarde.'
});

// Configurar nodemailer para usar Gmail con API Key
const transporter = nodemailer.createTransport({
    service: 'gmail', // Indica que estamos usando Gmail
    auth: {
        user: process.env.EMAIL_USER, // Correo configurado (debería ser una cuenta de Gmail)
        pass: process.env.EMAIL_PASS, // API Key de Gmail (en vez de la contraseña)
    },
});

// Ruta para el formulario de contacto
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

        // Configuración del correo
        const mailOptions = {
            from: process.env.EMAIL_USER, // El correo configurado como remitente
            to: 'rodrigo.lagos.fernandez@gmail.com', // Correo destinatario
            subject: 'Nuevo formulario de contacto recibido',
            text: `Se ha recibido un nuevo formulario de contacto:
            Nombre: ${name}
            Teléfono: ${phone}
            Dirección: ${address}
            Email: ${email}
            Cómo nos conoció: ${source}`
        };

        // Enviar el correo usando nodemailer y Gmail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo: ', error);
                return res.status(500).json({ error: 'Error al enviar el correo. Inténtalo más tarde.' });
            }
            console.log('Correo enviado: ' + info.response);
            
            // Respuesta exitosa
            // @ts-ignore
            res.status(201).json({ message: 'Formulario enviado correctamente y correo enviado', id: results.insertId });
        });
    });
});

module.exports = router;
