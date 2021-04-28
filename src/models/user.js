const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const validator = require('validator')

const keys = require('../keys')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//statics are module methods
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    
    if (!user){
        throw new Error ('Unable to login!')
    }

    const passwordIsMatched = await bcrypt.compare(password, user.password)

    if (!passwordIsMatched){
        throw new Error ('Unable to login!')
    }

    return user
}

//methods are instance methods
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, keys.jwtSalt)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.getPublicProfile = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}
//Hash password
userSchema.pre(['save', 'updateOne', 'findOneAndUpdate', 'findByIdAndUpdate'], async function (next) {
    //'save' works when document is created
    const user = this

    // console.log('Just before saving!')
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User