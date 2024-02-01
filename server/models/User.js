import mongoose from 'mongoose'
import bcrypt from 'bcrypt'


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },

},
{
    timestamps: true
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model("User", UserSchema)