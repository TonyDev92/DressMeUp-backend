const User = require('../api/models/user.model');
const {verifySign} = require('../utils/jwt');

const isAuth = async (req, res, next) => {

    try {

        const authorization = req.headers.authorization;

        if(!authorization){
            return res.status(401).json({message: 'unauthorized'})
        }
        const token = authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message:'no token provided'})
        }
        let tokenVerified = verifySign(token , process.env.JWT_KEY);

        if(!tokenVerified.id){
            return res.status(401).json(tokenVerified);
        }
        const userLogged = await User.findById(tokenVerified.id);
        req.user = userLogged;

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

const isAdmin = async (req, res, next) => {

    try {
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).json({message: 'unauthorized'})
        }
        const token = authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: 'no token provided'})
        }
        let tokenVerified = verifySign(token, process.env.JWT_KEY);
        if(!tokenVerified.id){
            return res.status(401).json(tokenVerified)
        }
        const userLogged = await User.findById(tokenVerified.id);
        req.user = userLogged;
        if(userLogged.role !== 'admin'){
            return res.status(401).json({message: 'need to be administrator'})
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {isAdmin, isAuth};

