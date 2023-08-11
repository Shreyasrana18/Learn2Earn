const express = require("express");
const { changepassword, checkAnswer,getStudent,updateTotalPts,getquiz,buyItems, getTransactionList } = require("../controllers/studentController");
const router = express.Router();

router.route("/changepassword/:id").post(changepassword);
router.route("/checkanswer/:id").post(checkAnswer);
router.route("/getstudent/:id").get(getStudent);
router.route("/updatetotalpts/:id").post(updateTotalPts);
router.route("/getquiz/:id").get(getquiz);
router.route("/buyitems/:id").post(buyItems).get(getTransactionList);

module.exports = router;