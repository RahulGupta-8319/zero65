const expenseModel = require('../models/expenseModel');
const loanModel = require('../models/expenseModel')

const createExpense = async (req, res) => {
    try {
        let data = req.body

        let { date, amount, head, tag, note, _id } = data

        // console.log("data", data);

        if (!date) return res.status(400).send({ status: false, message: "before adding choose Date" });
        if (!amount) return res.status(400).send({ status: false, message: "before adding choose Amount" });
        if (!head) return res.status(400).send({ status: false, message: "before adding choose Head" });
        if (!tag) return res.status(400).send({ status: false, message: "before adding choose Tag" });
        if (!note) return res.status(400).send({ status: false, message: "before adding choose note" });

        if (_id) {

            // console.log("createEXpense if =>", data);
            const updateExpense = await expenseModel.findByIdAndUpdate(_id, data, { new: true })
            // console.log(updateExpense);
            return res.status(200).send({ status: true, message: "update successfully", });

        } else {

            // console.log("else block ");
            delete data._id
            const createExpense = await expenseModel.create(data)


            return res.status(201).send({ status: true, message: "Added successfully", });
        }


    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

const getExpense = async (req, res) => {
    try {

        let emailId = req.params.emailId

        const getExpenseFromDb = await expenseModel.find({ email: emailId })

        // let temp = getExpenseFromDb.find()
        console.log(getExpenseFromDb);

        let summaryArray = []

        let summary = getExpenseFromDb.map(exObj => {

            let hd = exObj.head
            let am = exObj.amount
            let tg = exObj.tag
            let flag = 0

            summaryArray.map(smObj => {
                if (smObj.head == hd) {
                    smObj.totalAmount = smObj.totalAmount + am

                    let updateTag = smObj.tags.find(obj => {
                        return obj.tag === tg
                    })
                    // console.log("updateTag====>", updateTag);
                    if (updateTag) {
                        
                        updateTag.amount = updateTag.amount + am
                        // console.log("updatedTag***", updateTag);
                        
                    }else{

                        let tamp = {
                            tag: tg,
                            amount: am
                        }
                        smObj.tags.push(tamp)
                    }



                    flag = 1
                }
            })

            if (flag == 0) {
                let tamp = {
                    head: hd,
                    totalAmount: am,
                    tags: [{
                        tag: tg,
                        amount: am
                    }]
                }
                summaryArray.push(tamp)
            }
        })

        // console.log("summary", summaryArray);
        // console.log("getExpenseFromDb======>", getExpenseFromDb);
        return res.status(200).send({ status: true, data: { getExpenseFromDb, summaryArray } });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: false, error: error.message })
    }
}
const deleteExpense = async (req, res) => {
    try {

        let id = req.params.id
        // console.log(id);

        const delExpenseFromDb = await expenseModel.findByIdAndDelete({ _id: id }, { new: true })
        // console.log(delExpenseFromDb);
        return res.status(200).send({ status: true, message: "Deleted successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ status: false, error: error.message })
    }
}





module.exports = { createExpense, getExpense, deleteExpense }