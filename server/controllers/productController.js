import slugify from "slugify"
import { BadRequestError } from "../errors/index.js"
import fs from 'fs'
import Product from "../models/Product.js"

const createProduct = async (req, res) => {

    const { photo } = req.files

    let product = new Product({
        ...req.fields,
        slug: slugify(req.fields.name)
    })

    if (photo) {
        product.photo = {
            data: fs.readFileSync(photo.path),
            contentType: photo.type
        }
    }

    await product.save()

    res.status(201).json({
        msg: "product created successfully",
        product
    })
}



const updateProduct = async (req, res) => {
    const { id } = req.params
    const { photo } = req.files

    const product = await Product.findByIdAndUpdate(
        id,
        {
            ...req.fields,
            slug: slugify(req.fields.name)
        },
        {
            new: true
        }
    )

    if (!product) throw new BadRequestError(`no Product with id ${id}`)
    if (photo) {
        product.photo = {
            data: fs.readFileSync(photo.path),
            contentType: photo.type
        }
        await product.save()
    }


    res.status(200).json({
        msg: "Product successfully updates",
        product
    })
}

const getAllProduct = async (req, res) => {

    const {category} = req.query
    const queryObject = {}

    if(category){
        queryObject.category = { $in: category.split(',') }
    }

    let product = await Product.
        find(queryObject).
        populate("category").
        select("-photo").
        limit(12).
        sort({ createdAt: -1 })

    res.status(200).json({
        msg: "all products",
        product,
        count: product.length
    })
}

const getProduct = async (req, res) => {
    const product = await Product.findOne({
        slug: req.params.slug
    }).populate("category").select("-photo")
    if (!product) throw new BadRequestError(`product not found`)
    res.status(200).json({
        msg: "Product found",
        product
    })
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndDelete(id).select("-photo")
    if (!product) throw new BadRequestError(`no Product with id ${id}`)
    res.status(200).json({
        msg: "Product deleted successfully",
        product
    })
}

const getPhoto = async (req, res) => {
    const product = await Product.findById(req.params.id).select("photo")
    if (!product) throw new BadRequestError(`no Product with id ${req.params.id}`)
    if (product.photo.data) {
        res.contentType(product.photo.contentType)
        return res.status(200).send(product.photo.data)
    }
}

export {
    createProduct,
    updateProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    getPhoto
}