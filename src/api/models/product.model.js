const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: true },
        class:{type: String, required: true},
        image: { type: String, required: false, default:'https://res.cloudinary.com/dpekebzbd/image/upload/v1686837354/DressMeUP/default_fy8ldf.png' }
    }, {
    timestamps: true
    }
)

const Product = mongoose.model('products', product);
module.exports = Product;
