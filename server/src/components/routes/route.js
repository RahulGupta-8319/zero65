const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const expenseController = require("../controllers/expenseController")

router.get('/', (req, res) => {


    res.send('working fine ...!!')

})

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)

router.post('/createexpense', expenseController.createExpense)
router.get('/getexpense/:emailId', expenseController.getExpense)


router.all('*', (req, res) => {
    res.send('page not found...!!!')
})


module.exports = router

