// routes/user.js
const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

// Endpoint para agregar un nuevo usuario
router.post('/', [
    body('name').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('username').trim().notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('rol_id').isInt().withMessage('El rol es obligatorio y debe ser numérico'),
    body('email').isEmail().withMessage('El correo electrónico es obligatorio y debe ser válido')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, rol_id, email } = req.body;

    // Generar una contraseña aleatoria
    const generatedPassword = Math.random().toString(36).slice(-8); // Contraseña aleatoria de 8 caracteres
    const hashedPassword = await bcrypt.hash(generatedPassword, 10); // Hash de la contraseña

    // Consultar para insertar el nuevo usuario en la base de datos
    const query = `
        INSERT INTO users_academy (name, username, password, rol_id, created_at) 
        VALUES (?, ?, ?, ?, NOW())
    `;
    const values = [name, username, hashedPassword, rol_id];

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            return res.status(500).json({ message: 'Error al agregar usuario' });
        }

        // Si el usuario se agregó correctamente, enviar la contraseña por correo
        sendPasswordEmail(email, generatedPassword)
    .then(() => {
        res.status(201).json({ message: 'Usuario agregado exitosamente y contraseña enviada por correo' });
    })
    .catch((emailError) => {
        console.error('Error al enviar el correo:', emailError);
        res.status(500).json({ message: 'Usuario agregado pero hubo un error al enviar el correo' });
    });
    });
});

// Función para enviar la contraseña por correo electrónico
async function sendPasswordEmail(email, password) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Reemplazar con tu correo
            pass: process.env.EMAIL_PASS // Reemplazar con tu contraseña
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Contraseña generada para tu cuenta',
        text: `Hola, tu contraseña generada es: ${password}`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error al enviar el correo:', error);
                reject(error);
            } else {
                console.log('Correo enviado:', info.response);
                resolve(info);
            }
        });
    });
}

module.exports = router;
