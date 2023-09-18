// ===================== 1st way =========== //

const mongoose = require('mongoose')
const recordSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    years: {
        type: [{
            year: String,
            totalAmount: Number
        }]
    },
    quaters: {
        type: [{
            year: String,
            qt: String,
            totalAmount: Number
        }]
    },
    months: {
        type: [{
            year: String,
            month: String,
            totalAmount: Number
        }]
    }


}, { timestamps: true })

module.exports = mongoose.model('record', recordSchema)

// ===================== 2nd Way =========== //

const getExpenseFromDb = await expenseModel.find({ email: emailId })   // aray of object

const yearData = (getExpenseFromDb) => {

    let yearsData = []

    let maping = getExpenseFromDb.map(obj => {

        let yr = obj.date
        let am = obj.amount

        let yearmaping = yearData.map(obj => {

            if (obj.year == yr) {
                obj.totalAmount += am
            } else {

                let temp = {
                    year: yr,
                    totalAmount: am
                }
                yearData.push(temp)
            }
        })

    })

    return yearsData
}





