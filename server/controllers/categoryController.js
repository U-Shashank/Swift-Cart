import slugify from "slugify"
import { BadRequestError } from "../errors/index.js"
import Category from "../models/Category.js"

const createCategory = async (req, res) => {
    const { name } = req.body
    let category = await Category.findOne({
        name
    })

    if (category) throw new BadRequestError("Category already exists")

    category = Category.create({
        name: name,
        slug: slugify(name)

    })

    res.status(201).json({
        msg: "category created successfully",
        category
    })

}

const updateCategory = async (req, res) => {
    const { name } = req.body
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(
        id,
        {
            name,
            slug: slugify(name),
        },
        {
            new: true
        }
    )
    if (!category) throw new BadRequestError(`no category with id ${id}`)
    res.status(200).json({
        msg: "category successfully updated",
        category
    })
}

const getAllCategory = async (req, res) => {
    const category = await Category.find()

    res.status(200).json({
        msg: "all categories",
        category
    })
}

const getCategory = async (req, res) => {
    const category = await Category.find({
        slug
    })
    if (!category) throw new BadRequestError(`category not found`)
    res.status(200).json({
        msg: "category found",
        category
    })
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    const category = await Category.findByIdAndDelete(
        id
    )
    if (!category) throw new BadRequestError(`no category with id ${id}`)
    res.status(200).json({
        msg: "category deleted successfully",
        category
    })
}

export { createCategory, updateCategory, getAllCategory, getCategory, deleteCategory }