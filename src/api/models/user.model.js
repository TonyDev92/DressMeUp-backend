const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {type: String , required: true},
        password: { type: String, required: true},
        name: {type: String, required: true},
        street: {type:String, required: true},
        postalCode:{type: String, required: true},
        city:{type: String, required: true},
        province: {type: String, required: true},
        role: {type: String, default: 'user' , enum: ['user', 'admin']},
        products: [{type: mongoose.Types.ObjectId, ref: 'products' }]
    },{
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);
module.exports = User;