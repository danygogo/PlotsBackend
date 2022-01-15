const { Router } = require("express");
const { check } = require("express-validator");
const { newUser, login } = require("../controllers/authControllers");
const { validateFields } = require("../middlewares/validateFields");



const router = Router();

router.post(
    "/new",
    [
        check("name", "Your name is required").isLength({min:2}),
        check("email", "The e-mail is required").isEmail(),
        check("phone", "Your phone is required, use the format: 1234-5678").custom((val)=> /^\d{4}(-)\d{4}$/.test(val)),
        check("password", "The password is required, use a minimum of 8 characters").isLength({min:8}),
        validateFields
    ],
    newUser)

router.post(
    "/login", //path
    [
        check("email", "The e-mail is required").isEmail(),
        check("password", "The password is required, a minimum of 8 characters is required and it must be alphanumeric").isLength({min:8}),
        validateFields
    ],      //validators
    login)   //controller


module.exports = router;