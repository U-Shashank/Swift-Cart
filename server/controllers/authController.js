import JWT from "jsonwebtoken"
import { BadRequestError, UnauthenticatedError } from "../errors/index.js"
import User from "../models/User.js"

const register = async (req,res) => {
    const {name, email, password, phone, address} = req.body
    
    let user = await User.findOne({email})
    if(user) throw new BadRequestError("Email already registered")

    user = await User.create({name, email, password, phone, address})

    res.status(201).json({
        user,
        msg: "User registered successfully"
    })
}

const login = async (req,res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }

    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError("Invalid credentials")
    }
    
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid credentials")
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "100d"
    })

    res.status(200).json({
        user,
        token
    })
}

const updateUser = async (req, res) => {
    const { email, ...rest } = req.body;

    const updatedFields = Object.fromEntries(
        Object.entries(rest).filter(([_, value]) => value !== '')
    );

    const user = await User.findOneAndUpdate({ email }, updatedFields, { new: true, runValidators: true });
    if (req.body.password) user.markModified('password')
    await user.save()
    if (!user) {
        throw new BadRequestError("No user with given email");
    }

    res.status(201).json({
        user,
        msg: "User updated successfully"
    });
};


export {
    register,
    login,
    updateUser
}
