const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateSign } = require('../../utils/jwt');
const { validatePassword , validateEmail , validateEmailOnUse } = require('../../utils/validators');

//GET USER PRODUCTS

const getUserProducts = async (req, res) => {

    try {
        const users = await User.find().populate('products');
        const public = [];
        for(const obj of users){
            const productList = {
                products : obj.products
            }
            public.push(productList)
        }

        return res.status(200).json(public)
    } catch (error) {
        res.status(500).json(error)
    }
}

//USER LOGIN 

const userLogin = async (req, res) => {

    try {
        const userData = await User.find({ email : req.body.email});
        if(!userData){
            return res.status(404).json({message: 'invalid email address'});
        }
        if(!bcrypt.compareSync(req.body.password, userData.password)){
            return res.status(404).json({message: 'invalid password'});
        }
        const token = generateSign(userData._id , userData.email)
        console.log(`user: ${userData} , token: ${token}`);
        return res.status(200).json({userData, token});
    } catch (error) {
        return res.status(500).json(error)
    }
}

//USER REGISTER

const userRegister = async (req, res) => {
    try {
        const newUser = new User(req.body);

        if(!validateEmail(newUser.email)){
            return res.status(400).json({message: 'invalid email'})
        }
        if(!validatePassword(newUser.password)){
            return res.status(400).json({message: 'invalid password'})
        }
        if(await validateEmailOnUse(newUser.email) > 0 ){
            return res.status(400).json({message: 'This email is already on use'})
        }

        newUser.password = bcrypt.hashSync(newUser.password, 10);
        const newEmail = await newUser.save();
        const token = generateSign(newEmail._id , newEmail.email);
        console.log(`user: ${newEmail} token: ${token}`);
        return res.status(201).json({newEmail, token})

    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { userLogin, userRegister , getUserProducts };

