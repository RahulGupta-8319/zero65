import React, { useState, useEffect } from 'react'
import { UilSignOutAlt } from '@iconscout/react-unicons'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Welcome = ({ loginUser, setLoginUser }) => {

    // console.log('welcomepage', loginUser);

    const [exense, setExpense] = useState({
        date: "",
        amount: "",
        head: "",
        tag: "",
        note: "",
        email: "",
        _id: ""

    })

    const [list, setList] = useState([])
    const [summary, setSummary] = useState([])

    const [editId, setEditId] = useState(0)


    
    //console.log("userloanObj", userLoanObj);

    const handleLogout = (e) => {
        setLoginUser({})
    }

    const handleChange = (e) => {

        let { name, value } = e.target
        setExpense({
            ...exense,
            [name]: value,
            email: loginUser.email

        })
    }

    const fetchData = async () => {
        try {

            let emailId = loginUser.email
            let res = await axios.get(`http://localhost:5000/getexpense/${emailId}`)

            if (res.data) {
                // console.log("res.data", res.data);
                setList(res.data.data.getExpenseFromDb)
                setSummary(res.data.data.summaryArray)
            }
        } catch (error) {
            console.log(error);
            let msg = error.response.data.message
            toast.error(msg)
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // console.log("exense", exense);
            let res = await axios.post('http://localhost:5000/createexpense', exense)

            if (res.data) {

                let msg = res.data.message
                toast.success(msg)
                fetchData()
                setEditId(0)
                setExpense({ date: "", amount: "", head: "", tag: "", note: "", _id: "" })
            }

        } catch (error) {
            console.log(error);
            let msg = error.response.data.message
            toast.error(msg)
        }
    }

    const handleEdit = (id) => {

        const editExpense = list.find((obj) => obj._id === id)
        console.log("editExpense", editExpense);
        setExpense(editExpense)
        setEditId(id)
    }

    const handleDelete = async (id) => {

        try {
            console.log("exense", id);
            let res = await axios.delete(`http://localhost:5000/deleteexpene/${id}`)

            if (res.data) {

                let msg = res.data.message
                toast.success(msg)
                fetchData()
            }

        } catch (error) {
            console.log(error);
            let msg = error.response.data.message
            toast.error(msg)
        }

    }


    useEffect(() => {
        let name = loginUser.firstName + " " + loginUser.lastName
        toast.success(`welcome ${name}`);
        fetchData()

    }, []);



    return (

        <div class="wel-wrapper">
            <div class="wel-container p-14 ">

                {/* --------- toast container -----  */}
                <ToastContainer />

                {/* ------------  Heading ------------  */}

                <div class="heading space-y-3 flex justify-between  p-4 ">
                    <div>
                        <h1 class="font-serif font-extrabold text-3xl text-gray-800">
                            Hi, {loginUser.firstName} !👋
                        </h1>


                    </div>
                    <div class="group relative ">
                        <button class="bg-blue-500 text-white p-2 rounded-lg hover:scale-105 " onClick={handleLogout}>
                            <UilSignOutAlt />
                        </button>
                        <p class="absolute  hidden text-gray-700 justify-center items-center  group-hover:block">
                            Logout
                        </p>
                    </div>
                </div>

                {/* ------------  add expense ---------   */}

                <div class="addExpense-wrapper mb-10">

                    <div class="addExpense-conatiner shadow-lg  min-h-[150px] p-6 ">
                        <div class="heading flex justify-center  font-bold text-gray-600 text-2xl font pb-5  ">
                            <h1>Add Expense </h1>
                        </div>

                        <div class="list   ">
                            <table className='flex flex-col py-4 space-y-3'>
                                <thead className='flex flex-row' >
                                    <tr className='flex flex-row justify-between w-full ' >
                                        <th className='min-w-[180px]'>Date</th>
                                        <th className='min-w-[180px]'>Amount</th>
                                        <th className='min-w-[180px]'>Head</th>
                                        <th className='min-w-[180px]'>Tag</th>
                                        <th className='min-w-[180px]'>Note</th>
                                    </tr>
                                </thead>
                                <tbody className='flex flex-row text-sm' >
                                    <tr className='flex flex-row justify-between w-full'>
                                        <td>
                                            <input
                                                type="date"
                                                name="date"
                                                className="border bg-gray-200 rounded-full px-3 py-2 outline-none focus:ring focus:ring-blue-400 min-w-[180px] "
                                                value={exense.date}
                                                onChange={handleChange}
                                                required
                                            />

                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                name="amount"
                                                className="border bg-gray-200 rounded-full  px-3 py-2 outline-none focus:ring focus:ring-blue-400 w-full min-w-[180px]"
                                                placeholder='eg:1000'
                                                value={exense.amount}
                                                onChange={handleChange}
                                                required
                                            />

                                        </td>
                                        <td>
                                            <select
                                                id="selectItem"
                                                name="head"
                                                className="border bg-gray-200 rounded-full px-3 py-2 outline-none focus:ring focus:ring-blue-400 w-full  min-w-[180px]"
                                                value={exense.head}
                                                onChange={handleChange}
                                                required

                                            >
                                                <option value="">Select an option</option>
                                                <option value="food">Food</option>
                                                <option value="travel">Travel</option>
                                                <option value="hotel">Hotel</option>
                                            </select>

                                        </td>
                                        <td>
                                            <select
                                                id="selectItem"
                                                name="tag"
                                                className="border bg-gray-200 rounded-full px-3 py-2 outline-none focus:ring focus:ring-blue-400 w-full  min-w-[180px]"
                                                value={exense.tag}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select an option</option>
                                                <option value="office">Office</option>
                                                <option value="personal">Personal</option>
                                            </select>

                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="note"
                                                className="border bg-gray-200 rounded-full px-3 py-2 outline-none focus:ring focus:ring-blue-400 w-full  min-w-[180px]"
                                                placeholder='Write Note'
                                                value={exense.note}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div class="button flex justify-center py-5 px-10">
                            <button
                                className='text-2xl font-semibold text-blue-500 border border-blue-400 rounded-full   py-3 w-full hover:text-white hover:bg-blue-500'
                                onClick={handleSubmit}
                            >
                                {
                                    editId ? <div>Edit</div> : <div>Add</div>
                                }

                            </button>
                        </div>
                    </div>

                </div>


                {/* ------------- lists -----------  */}


                <div class="list-wrapper">

                    <div class="list-conatiner shadow-lg  min-h-[150px] p-6 mb-14">
                        <div class="heading flex justify-center  font-bold text-gray-600 text-2xl font pb-5  ">
                            <h1>List Of Kharche </h1>
                        </div>

                        {
                            list.length > 0 ?
                                (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full ">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2">Date</th>
                                                    <th className="px-4 py-2">Amount</th>
                                                    <th className="px-4 py-2">Head</th>
                                                    <th className="px-4 py-2">Tags</th>
                                                    <th className="px-4 py-2">Note</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="border px-4 py-2">
                                                            {
                                                                item.date
                                                            }
                                                        </td>
                                                        <td className="border px-4 py-2">{item.amount}</td>
                                                        <td className="border px-4 py-2">{item.head}</td>
                                                        <td className="border px-4 py-2">{item.tag}</td>
                                                        <td className="border px-4 py-2 max-w-[250px]">{item.note}</td>
                                                        <td className='flex flex-row justify-center space-x-1 max-w-[150px]'>
                                                            <button className='bg-blue-600 text-white rounded-full px-2 py-1 text-sm hover:bg-orange-500  ' onClick={() => handleEdit(item._id)}>
                                                                Edit
                                                            </button>
                                                            <button className='bg-blue-600 text-white rounded-full px-2 py-1 text-sm hover:bg-orange-500 ' onClick={() => handleDelete(item._id)}>
                                                                Delete
                                                            </button>
                                                        </td>
                                                        
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                                :
                                (
                                    <div className='flex justify-center text-gray-500'>
                                        No Data Fount...!!
                                    </div>
                                )
                        }

                    </div>
                </div>

                {/* ---------- summary --------  */}

                <div class="summary-wrapper">

                    <div class="summary-conatiner shadow-lg  min-h-[150px] p-6">
                        <div class="heading flex justify-center  font-bold text-gray-600 text-2xl font pb-5  ">
                            <h1>Summary </h1>
                        </div>
                        {
                            console.log("summary", summary)
                        }

                        {
                            list.length > 0 ?
                                (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full ">
                                            <thead>
                                                <tr>
                                                    <th className="px-4 py-2">Heads</th>
                                                    <th className="px-4 py-2">TotalAmount</th>
                                                    <th className="px-4 py-2">Tags</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    summary.map(item =>
                                                        <tr >
                                                            <td className="border px-4 py-2">{item.head}</td>
                                                            <td className="border px-4 py-2">{item.totalAmount}</td>

                                                            <td className="border px-4 py-2">
                                                                {
                                                                    item.tags.map((item) => (
                                                                        <div>
                                                                            <span>{item.tag} : </span>
                                                                            <span>{item.amount}</span>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </td>

                                                        </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                )
                                :
                                (
                                    <div className='flex justify-center text-gray-500'>
                                        No Data Fount...!!
                                    </div>
                                )
                        }

                    </div>
                </div>

            </div>
            <div class="h-screen"></div>
        </div >
    )
}



export default Welcome