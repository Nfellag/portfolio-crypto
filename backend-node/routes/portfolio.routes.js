const express = require('express');
const db = require('../db');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();


router.get('/', auth, (req, res) => {
    db.query('SELECT * FROM assets WHERE portfolio_id=?', [req.userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});


router.post('/asset', auth, (req, res) => {
    const { name, symbol, quantity } = req.body;
    db.query(
        'INSERT INTO assets (portfolio_id, name, symbol, quantity) VALUES (?,?,?,?)',
        [req.userId, name, symbol, quantity],
        err => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Actif ajouté' });
        }
    );
});


module.exports = router;