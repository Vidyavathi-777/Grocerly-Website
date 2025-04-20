import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide product name"]
    },
    image: {
        type: Array,
        default: []
    },  
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
        }
    ],
    subcategory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'subcategory'
        }
    ],
    unit: {
        type: String,
        default: ""
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
    description: {
        type: String,
        default: ""
    },
    more_details: {
        type: Object,
        default: {}
    },
    publish: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model('product', productSchema);
export default ProductModel;
