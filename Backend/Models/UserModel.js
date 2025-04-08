
const mongoose = require("mongoose");


const UsersSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20,
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 20,
        },
        pin: {
            type: Number,
            required: true,
            minlength: 4,
            maxlength: 4,
            validate: {
                validator: (pin) => /^[0-9]{4}$/.test(pin),
                message: "Pin must be a 4-digit number."
            }
        },
        Transictions:{
            type: [],

        },
        TransictionsDates:{
            type: [],

        },
        interestRate:{
            type:Number,
        },
        
        status: {
            type: 'boolean',
            default: true,
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', UsersSchema);
module.exports = User;