import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.js';

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'user does not exist' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const token = jsonwebtoken.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'email already used' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        });
        if (!user) {
            return res.status(500).json({ message: 'something went wrong' });
        }

        res.status(200).json({ message: 'account created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};