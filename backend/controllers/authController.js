import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

export const registerUser = async (req, res) => {
    const {firstName, lastName, gender, email, password} = req.body;

    // Validation
    if (!firstName || !gender || !email || !password) {
        return res.status(400).json({ message: 'Field are required'});
    }

    // Try if existing email
    try {
        const emailExist = await User.findOne({email});
        if (emailExist) {
            return res.status(400).json({message: 'Email already exist'});
        }

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            gender,
            email,
            password
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (e) {
        res.status(500).json({
            message: 'Error registering user', error: e.message
        });
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Field are required'});
    }

    try {
        const user = await User.findOne({email});
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // User exist
        return res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (e) {
        res.status(500).json({
            message: 'Error registering user', error: e.message
        });
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({
            message: 'Error registering user', error: e.message
        });
    }
}