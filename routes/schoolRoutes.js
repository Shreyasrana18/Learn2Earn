const express = require('express');
const router = express.Router();
const { schoolInformation, createStudent, createquizzes, clearquiz, getquiz, createShoppingList,getShoppingList,deleteShoppingList,updateShoppingList,deleteShoppingItems } = require('../controllers/schoolController');


router.route('/student').get(schoolInformation);
router.route('/student/:id').post(createStudent);
router.route('/quizzes/:id').post(createquizzes).delete(clearquiz).get(getquiz);
router.route('/shoppingcart/:id').post(createShoppingList).get(getShoppingList).delete(deleteShoppingList).put(updateShoppingList);
router.route('/shoppingitem/:id').delete(deleteShoppingItems);

module.exports = router;