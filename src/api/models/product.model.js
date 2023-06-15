const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: false, default: 'https://res.cloudinary.com/dpekebzbd/image/upload/v1686753664/DressMeUP/default_bhatbi.png' }
    }, {
    timestamps: true
}
)

const Product = mongoose.model('products', product);
module.exports = Product;
