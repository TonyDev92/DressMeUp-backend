const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {type: String , required: true},
        password: { type: String, required: true},
        role: {type: String, default: 'user' , enum: ['user', 'admin']},
        products: [{type: mongoose.Types.ObjectId, ref: 'products' }]
    },{
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);
module.exports = User;