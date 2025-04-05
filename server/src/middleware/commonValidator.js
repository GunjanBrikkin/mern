const { body } = require("express-validator");

const creationTimeValidate = [
    body("user_name").notEmpty().withMessage("user_name is required !!"),
    body("task").notEmpty().withMessage("task must be required !")
];

const updateTimeValidate = [
    body("id").notEmpty().withMessage("Please pass the id !!").isMongoId().withMessage("Pass the valide 12 digit mongo ID !!") // front developer error
];


module.exports = { creationTimeValidate, updateTimeValidate };