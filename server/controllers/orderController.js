import Order from "../models/Order.js"


const getOrders = async (req, res) => {
    const order = await Order
    .find({buyer: req.user._id})
    .populate("products", "-photo")
    .populate("buyer", "name")

    res.json(order)
}

const getAllOrders = async (req, res) => {
    const order = await Order
    .find()
    .populate("products", "-photo")
    .populate("buyer", "name")
    
    res.json(order)
}

const updateOrder = async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, {new: true}) 

    res.json({
        order,
        success: true
    })
}

export { getOrders, getAllOrders, updateOrder}