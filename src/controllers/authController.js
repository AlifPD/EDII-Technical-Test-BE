const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../services/authServices')

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES
        }
    )
}

const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                info: 'Data provided not sufficient'
            });
        }

        const userExist = await getUserByEmail(email);
        if (userExist) {
            return res.status(409).json({
                info: 'Email already exists'
            });
        }

        const userCreated = await createUser({
            role: "USER",
            email,
            password,
        });

        return res.status(201).json({
            info: 'Successfully register new account',
            data: {
                email: userCreated.email,
            }
        });
    } catch (err) {
        return res.status(500).json({
            info: err.message
        });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                info: 'Data provided not sufficient'
            });
        }

        const user = await getUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                info: 'Invalid credentials or User doesn\'t exist'
            });
        }

        const accessToken = generateToken({
            id: user.id,
            email: user.email,
            role: user.role
        })

        res.status(200).json({
            info: "Successfully Logged In",
            data: {
                token: accessToken,
                user: {
                    email: user.email,
                    role: user.role,
                    bio: user.bio
                }
            }
        });
    } catch (err) {
        return res.status(500).json({
            info: err.message
        });
    }
};

module.exports = {
    register,
    login,
}