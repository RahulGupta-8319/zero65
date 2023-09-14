const expenseModel = require('../models/expenseModel');
const loanModel = require('../models/expenseModel')

const createExpense = async (req, res) => {
    try {
        let data = req.body

        let { date, amount, head, tag, note } = data

        // console.log("data", data);

        if (!date) return res.status(400).send({ status: false, message: "before adding choose Date" });
        if (!amount) return res.status(400).send({ status: false, message: "before adding choose Amount" });
        if (!head) return res.status(400).send({ status: false, message: "before adding choose Head" });
        if (!tag) return res.status(400).send({ status: false, message: "before adding choose Tag" });
        if (!note) return res.status(400).send({ status: false, message: "before adding choose note" });

        const createExpense = await expenseModel.create(data)
        // console.log(createExpense);
        return res.status(201).send({ status: true, message: "Added successfully", });

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

const getExpense = async (req, res) => {
    try {

        let emailId = req.params.emailId

        const getExpenseFromDb = await expenseModel.find({ email: emailId })

        let summaryArray = []
        let summary = getExpenseFromDb.map(exObj => {

            let hd = exObj.head
            let am = exObj.amount
            let tg = exObj.tag
            let flag = 0

            summaryArray.map(smObj => {
                if (smObj.head == hd) {
                    smObj.totalAmount = smObj.totalAmount + am
                    if (!smObj.tags.includes(tg)) {
                        smObj.tags = smObj.tags + "," + tg
                    }
                    flag = 1
                }
            })

            if (flag == 0) {
                let tamp = {
                    head: hd,
                    totalAmount: am,
                    tags: tg
                }
                summaryArray.push(tamp)
            }
        })

        // console.log("summary", summaryArray);
        // console.log("inputdate======>", getExpenseFromDb);
        return res.status(200).send({ status: true, data: { getExpenseFromDb, summaryArray } });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: false, error: error.message })
    }
}



module.exports = { createExpense, getExpense }