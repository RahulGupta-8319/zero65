const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({

    date: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    head: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }


}, { timestamps: true })

module.exports = mongoose.model('expense', expenseSchema)