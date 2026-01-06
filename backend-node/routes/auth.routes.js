const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();


router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 8);
    db.query('INSERT INTO users (email, password) VALUES (?,?)', [email, hashed], err => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Utilisateur créé' });
    });
});


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email=?', [email], (err, results) => {
        if (!results.length) return res.status(404).json({ message: 'Utilisateur introuvable' });
        const user = results[0];
        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });
        const token = jwt.sign({ id: user.id }, 'SECRET_KEY', { expiresIn: '24h' });
        res.json({ token });
    });
});


module.exports = router;