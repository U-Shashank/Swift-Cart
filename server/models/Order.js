import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
    }
}, { timestamps: true })

export default mongoose.model("Order", OrderSchema)