const Router = require('express');
const router = new Router();
const controller = require('./authControler');
const { check } = require('express-validator');

router.post('/registration', [
    check('userName', "Username cannot be empty").notEmpty(),
    check('password', "Password cannot be empty").isLength({min: 1, max: 10})
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;
