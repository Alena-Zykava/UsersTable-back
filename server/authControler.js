const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" });
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Error"})
            }
            const { userName, password } = req.body;
            const candidate = await User.findOne({ userName });
            if (candidate) {
                return res.status(400).json({massage: "A user with the same name already exists!"})
            }
            const hashPassword = bcrypt.hashSync(password, 5);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({ userName, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return res.json({massage: "User registered successfully!"})
        } catch (e) {
            console.log(e);
            res.status(400).json({massage: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const { userName, password } = req.body;
            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(400).json({ massage: `User ${userName} not found` });
            };
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ massage: "Incorrect password entered" });
            };
            const token = generateAccessToken(user._id, user.roles);
            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({massage: 'Login error'})
        }        
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (e) {
            
        }        
    }
}

module.exports = new authController();