const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateSign } = require('../../utils/jwt');
const { validatePassword , validateEmail , validateEmailOnUse } = require('../../utils/validators');


//GET USER PRODUCTS

const getUserProducts = async (req, res) => {

    try {
        const {id} = req.params;

        const user = await User.findById(id).populate('products');

        const public = [];
        for(const obj of user.products){
            const productList = {
                products : obj
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
        const userData = await User.findOne({ email : req.body.email});
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
        if(newUser.street == ""){
            return res.status(400).json({message: "Street Required"})
        }
        if(newUser.city == ""){
            return res.status(400).json({message: "City Required"})
        }
        if(newUser.postalCode == ""){
            return res.status(400).json({message: "Postal Code Required"})
        }
        if(newUser.name == ""){
            return res.status(400).json({message: "Name Required"})
        }
        if(newUser.province == ""){
            return res.status(400).json({message: "Province Required"})
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

const userUpdated = async(req, res) => {

    try {
        const {id} = req.params;
        const userToUpdate = new User(req.body);
        userToUpdate._id = id;

        const updatedUser = await User.findByIdAndUpdate(id, userToUpdate);

        return !updatedUser ? res.status(404).json({message: "User not Found"}) : res.status(200).json({message: "User updated succesfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


const updateCart = async(req, res) => {
    try {
    
        const {id} = req.params;
        const cartProducts = req.body.products;

        const updatedUser = await User.findByIdAndUpdate(id, { products : cartProducts} , {new: true});

        return !updatedUser ? res.status(404).json({message: 'Not Found'}) :  res.status(200).json(cartProducts);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const removeFromCart = async(req, res) => {
    try {
        const {id} = req.params;
        const productId = req.body.products;
        const user = await User.findById(id);
        if(!user){
            res.status(404).json({message: 'User Not Found'})
        }

        const products = user.products;
        const index = products.findIndex((product) => product.toString() === productId.toString());
        
        if(index === -1){
            return res.status(404).json({message: 'Product Not Found'})
        }
        products.splice(index, 1);
        user.products = products;

        await user.save();

        return res.status(200).json(user.products)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

const checkSesion = async(req,res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error)
    }

}

const deleteAcount = async(req, res) => {

    try {
        const {id} = req.params;
        const userToDelete = await User.findByIdAndDelete(id);

        return !userToDelete ? res.status(404).json({message: 'Not Found'}) : res.status(200).json({message: 'Account Delete'})
    } catch (error) {
        res.status(500).json(error);
    }
}
module.exports = { userLogin,
    userRegister, 
    getUserProducts, 
    checkSesion, 
    updateCart,
    deleteAcount, 
    removeFromCart,
    userUpdated
};

