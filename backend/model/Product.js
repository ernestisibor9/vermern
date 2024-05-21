const mongoose = require('mongoose');

// Create schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
},
{
    timestamps: true
}
);

// Create model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;



