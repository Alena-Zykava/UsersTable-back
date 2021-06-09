const Router = require('express');
const router = new Router();
const controller = require('./authControler');
const { check } = require('express-validator');



router.post('/registration', [
    check('userName').notEmpty(),
    check('password').isLength({ min: 1 }),
    check('email').isEmail()
], controller.registration);
router.post('/login', controller.login);
router.post('/delete', controller.deleteUser);
router.post('/update', controller.updateUser);


router.get('/users', controller.getUsers);

module.exports = router;
