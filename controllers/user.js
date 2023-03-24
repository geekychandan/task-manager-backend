const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();


        // const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        const name=user.name;
        res.json({ token ,name});
    } catch (err) {
        res.status(400).send(err.message);
    }
};


module.exports = { signup, login };