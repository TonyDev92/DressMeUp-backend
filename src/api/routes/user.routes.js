const express = require('express');
const { userLogin,
    userRegister ,
    getUserProducts , 
    checkSesion, 
    updateCart , 
    deleteAcount,
    userUpdated,
    removeFromCart
} = require('../controllers/user.controller');
const { isAuth } = require('../../middleware/auth');
const router = express.Router();

router.get('/:id',[isAuth], getUserProducts);
router.post('/login', userLogin);
router.post('/register', userRegister);
router.put('/updateuser/:id', [isAuth], userUpdated);
router.put('/updatecart/:id',[isAuth], updateCart);
router.put('/remove/:id', [isAuth], removeFromCart);
router.post('/checksession',[isAuth] , checkSesion);
router.delete('/delete/:id',[isAuth], deleteAcount);

module.exports = router;
