const express = require('express');
const { userLogin, userRegister , getUserProducts  } = require('../controllers/user.controller');
const router = express.Router();

router.get('/', getUserProducts);
router.post('/login', userLogin);
router.post('/register', userRegister);

module.exports = router;
