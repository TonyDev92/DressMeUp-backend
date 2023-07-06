const express = require('express');
const { userLogin,
    userRegister ,
    getUserProducts , 
    checkSesion, 
    updateCart , 
    deleteAcount,
    removeFromCart
} = require('../controllers/user.controller');
const { isAuth } = require('../../middleware/auth');
const router = express.Router();

router.get('/:id', getUserProducts);
router.post('/login', userLogin);
router.post('/register', userRegister);
router.put('/updatecart/:id', updateCart);
router.put('/remove/:id', removeFromCart);
router.post('/checksession',[isAuth] , checkSesion);
router.delete('/delete', deleteAcount);

module.exports = router;
