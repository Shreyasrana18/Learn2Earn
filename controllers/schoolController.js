const asyncHandler = require("express-async-handler");
const School = require("../models/schoolModel");
const Student = require("../models/studentModel");
const Quiz = require("../models/quizModel");
const Shoppingcart = require("../models/shoppingcartModel");

const schoolInformation = asyncHandler(async (req, res) => {
    res.status(201).json({ message: "School Information" });
});

const createStudent = asyncHandler(async (req, res) => {
    const { names, age, username, password, standard } = req.body;
    if (!names || !age || !username || !password || !standard) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const school = await School.findById(req.params.id);
    const student = new Student({
        names,
        age,
        username,
        password,
        standard,
        schoolid: school._id
    });
    try {
        await student.save();
        school.studentlist.push(student._id);
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in saving student" });
    }
});

const createquizzes = asyncHandler(async (req, res) => {
    const { question, option1, option2, option3, option4, answer } = req.body;
    if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const school = await School.findById(req.params.id);
    const quiz = new Quiz({
        question,
        option1,
        option2,
        option3,
        option4,
        correct: answer
    });
    try {
        await quiz.save();
        school.quizlist.push(quiz._id);
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in saving quiz" });
    }
});

const clearquiz = asyncHandler(async (req, res) => {
    const school = await School.findById(req.params.id);
    school.quizlist = [];
    try {
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in clearing quiz" });
    }
});

const getquiz = asyncHandler(async (req, res) => {
    try {
        const school = await School.findById(req.params.id).populate('quizlist');
        res.status(200).json(school.quizlist);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz data" });
    }
});

// create shopping list
const createShoppingList = asyncHandler(async (req, res) => {
    const { itemname, itemprice, itemquantity } = req.body;
    if (!itemname || !itemprice || !itemquantity) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const school = await School.findById(req.params.id);
    const shoppingcart = new Shoppingcart({
        itemname,
        itemprice,
        itemquantity,
    });
    try {
        await shoppingcart.save();
        school.shoppinglist.push(shoppingcart._id);
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in saving shopping list" });
    }
});

// get shopping list
const getShoppingList = asyncHandler(async (req, res) => {
    try {
        const school = await School.findById(req.params.id).populate('shoppinglist');
        const nonZeroQuantityItems = school.shoppinglist.filter(item => item.itemquantity > 0);
        res.status(200).json(nonZeroQuantityItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shopping list data" });
    }
});

// delete shopping list
const deleteShoppingList = asyncHandler(async (req, res) => {
    const school = await School.findById(req.params.id);
    school.shoppinglist = [];
    try {
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in clearing shopping list" });
    }
});

// delete shopping items
const deleteShoppingItems = asyncHandler(async (req, res) => {
    const schoolId = req.params.id; // ID of the school
    const itemIdToRemove = req.body.itemId; // ID of the item to remove from shoppinglist

    try {
        const school = await School.findById(schoolId);

        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }
        const index = school.shoppinglist.indexOf(itemIdToRemove);
        if (index !== -1) {
            school.shoppinglist.pull(itemIdToRemove);
        }
        await school.save();

        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting shopping item from school' });
    }
});

// update shopping list
const updateShoppingList = asyncHandler(async (req, res) => {
    const filter = { _id: req.params.id };
    const update = { $set: { itemname: req.body.itemname, itemprice: req.body.itemprice, itemquantity: req.body.itemquantity } };
    const option = { new: true };
    const shoppingcart = await Shoppingcart.findByIdAndUpdate(filter, update, option);
    res.status(201).json(shoppingcart);

});


module.exports = { schoolInformation, createStudent, createquizzes, clearquiz, getquiz, createShoppingList,updateShoppingList,deleteShoppingList,getShoppingList, deleteShoppingItems };