import mongoose from 'mongoose'


const OrderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref:"Product"
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref:"User"
    },
    status: {
        type: String,
        default: 'pending',
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"]
    }
}, {timestamps: true})



export default mongoose.model("Order", OrderSchema)