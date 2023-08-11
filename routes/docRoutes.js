const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    const URL = "https://documenter.getpostman.com/view/20628687/2s9Xy3tXVJ";
    res.status(201).json(URL);
});

module.exports = router;