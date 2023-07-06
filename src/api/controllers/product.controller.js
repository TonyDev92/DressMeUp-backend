const { deleteFile } = require('../../middleware/delete');
const Product = require('../models/product.model');

//GET PRODUCT
const getProduct = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error)
    }
}

//GET PRODUCT BY ID
const getProductById = async (req, res) => {

    try {

        const { id } = req.params;
        const product = await Product.findById(id);
        !product ? res.status(404).json({ message: 'Product not found' }) : res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error)
    }
}

//POST
const postProduct = async (req, res) => {

    try {

        const newProduct = new Product(req.body);
        const createProduct = await newProduct.save();

        newProduct.image = req.file.path;

        return res.status(200).json(createProduct);

    } catch (error) {
        res.status(500).json(error.message);
    }
}


//PUT

const putProduct = async (req, res) => {

    try {
        const { id } = req.params.id;
        const productToUpdate = new Product(req.body);
        productToUpdate._id = id;

        if (req.file) {
            productToUpdate.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, productToUpdate).save();

        if (updatedProduct.image) {
            deleteFile(updatedProduct.image);
        }

        return !updatedProduct ? res.status(404).json({ message: "Product not found" }) : res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//DELETE

const deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);

        !deleteProduct ? res.status(404).json({ message: "Product not found" }) : res.status(200).json(deleteProduct);

    } catch (error) {
        res.status(500).json(500);
    }
}

module.exports = { getProduct, getProductById, postProduct, putProduct, deleteProduct };

