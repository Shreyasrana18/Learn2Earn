const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const School = require("../models/schoolModel");
const Shoppingcart = require("../models/shoppingcartModel");
const Transaction = require("../models/transactionModel");

const changepassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    if (!password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const student = await Student.findById(req.params.id);
    student.password = password;
    try {
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in saving school" });
    }
});

// check the correct answer for the quiz
const checkAnswer = asyncHandler(async (req, res) => {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
        res.status(400).json({ message: "Please provide an array of answers" });
        return;
    }

    const student = await Student.findById(req.params.id);
    const school = await School.findById(student.schoolid).populate('quizlist');
    let correctAnswers = 0;

    for (let i = 0; i < answers.length; i++) {
        const quiz = school.quizlist[i];

        if (quiz && quiz.correct === answers[i]) {
            correctAnswers++;
        }
    }
    res.status(200).json({ message: `Correct Answers: ${correctAnswers}` });
});

const getStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
});

// update total pts
const updateTotalPts = asyncHandler(async (req, res) => {
    const { totalpts } = req.body;
    const student = await Student.findById(req.params.id);
    if (totalpts < 0) {
        res.status(400).json({ message: "Please provide a positive number" });
    }
    const pts = student.totalpts + totalpts;
    student.totalpts = pts;
    try {
        await student.save();
        res.status(201).json(student);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in saving total pts" });
    }

});

const getquiz = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    try {
        const school = await School.findById(student.schoolid).populate('quizlist');
        res.status(200).json(school.quizlist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in getting quiz" });
    }
});

// buy items from shopping list of school
const buyItems = asyncHandler(async (req, res) => {
    const { itemID, qty } = req.body;
    if (!itemID || !qty) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const shoppingcart_update = await Shoppingcart.findById(itemID);
    const quantity = shoppingcart_update.itemquantity;
    const student = await Student.findById(req.params.id);
    student.totalpts = student.totalpts - (shoppingcart_update.itemprice * qty);
    await student.save();
    if (qty > quantity) {
        res.status(400).json({ message: "Not enough quantity of item present" });
    }
    const updatedquantity = quantity - qty;
    const filter = { _id: itemID };
    const update = { $set: { itemquantity: updatedquantity } };
    const option = { new: true };
    const shoppingcart = await Shoppingcart.findByIdAndUpdate(filter, update, option);

    const transItemname = shoppingcart.itemname;
    const transItemprice = shoppingcart.itemprice;
    const transaction = new Transaction({
        itemname: transItemname,
        itemprice: transItemprice,
    });
    try {
        await transaction.save();
        student.transactionlist.push(transaction._id);
        await student.save();
        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in saving transaction" });
    }
});

const getTransactionList = asyncHandler(async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('transactionlist');
        res.status(200).json(student.transactionlist);
    } catch (error) {
        res.status(500).json({ message: "Error fetching transaction list data" });
    }
});


module.exports = { changepassword, checkAnswer, getStudent, updateTotalPts, getquiz, buyItems, getTransactionList };