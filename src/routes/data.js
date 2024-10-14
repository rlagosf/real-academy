// routes/data.js
const express = require('express');
const connection = require('../db'); // Asegúrate de que la ruta sea correcta
const router = express.Router();

// Endpoint para obtener categorías de niños
router.get('/categories', (req, res) => {
    connection.query('SELECT * FROM categories_kids', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de categorías' });
        }
        res.json(results);
    });
});

// Endpoint para obtener posiciones de fútbol
router.get('/football-positions', (req, res) => {
    connection.query('SELECT * FROM football_position', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de posiciones de fútbol' });
        }
        res.json(results);
    });
});

// Endpoint para obtener roles de usuarios (roles_academy)
router.get('/roles', (req, res) => {
    connection.query('SELECT * FROM roles_academy', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de roles' });
        }
        res.json(results);
    });
});


router.get('/contact', (req, res) => {
    connection.query('SELECT name, phone, address, email, source FROM contact_forms ORDER BY created_at DESC', (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de contactos' });
        }
        res.json(results);
    });
});

router.get('/sources', (req, res) => {
    connection.query('SELECT * FROM how_meet_academy', (error, results) => {
        console.log(results)
        if (error) {
            return res.status(500).json({ error: 'Error en la consulta de contactos' });
        }
        res.json(results);
    });
});

module.exports = router;
