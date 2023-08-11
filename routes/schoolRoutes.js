const express = require('express');
const router = express.Router();
const { schoolInformation, createStudent, createquizzes, clearquiz, getquiz, createShoppingList,getShoppingList,deleteShoppingList,updateShoppingList,deleteShoppingItems,getStudentList } = require('../controllers/schoolController');


router.route('/info/:id').get(schoolInformation);
router.route('/studentlist/:id').get(getStudentList);
router.route('/student/:id').post(createStudent);
router.route('/quizzes/:id').post(createquizzes).delete(clearquiz).get(getquiz);
router.route('/shoppingcart/:id').post(createShoppingList).get(getShoppingList).delete(deleteShoppingList).put(updateShoppingList);
router.route('/shoppingitem/:id').delete(deleteShoppingItems);

module.exports = router;