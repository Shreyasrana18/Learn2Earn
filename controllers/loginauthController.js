const express = require("express");
const asyncHandler = require("express-async-handler");
const School = require("../models/schoolModel");
const Student = require("../models/studentModel");


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const school = await School.findOne({ email });
    if (email == school.email && password == school.password) {
        res.status(200).json(school);
    }
    res.status(500).json({ message: "Invalid Credentials" });
});

const loginStudent = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const student = await Student.findOne({ username });
    if (username == student.username && password == student.password) {
        res.status(200).json(student);
    }
    res.status(201).json({ message: "Invalid Credentials" });
});

const register = asyncHandler(async (req, res) => {
    const { email, password, names, address, boardType } = req.body;
    if (!email || !password || !names || !address || !boardType) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user= await School.findOne({ email }); 
    if (user) {
        res.status(400).json({ message: "User already exists" });
    }
    const school = new School({
        email,
        password,
        names,
        address,
        boardType,
    });
    try {
        await school.save();
        res.status(201).json(school);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in saving school" });
    }
});

module.exports = { login, register, loginStudent };