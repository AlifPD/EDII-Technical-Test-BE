const bcrypt = require('bcrypt');
const db = require('../database/models/index');

const getUserByEmail = async (email) => {
    return await db.users.findOne({
        where: { email },
        include: [{
            model: db.bio,
            required: false,
            include: [
                {
                    model: db.educations,
                    required: false
                },
                {
                    model: db.trainings,
                    required: false
                },
                {
                    model: db.employments,
                    required: false
                },
                {
                    model: db.skills,
                    required: false
                }
            ]
        }]
    });
};

const getUserById = async (id) => {
    return await db.users.findByPk({
        where: { id },
        include: [{
            model: db.bio,
            required: false,
            include: [
                {
                    model: db.educations,
                    required: false
                },
                {
                    model: db.trainings,
                    required: false
                },
                {
                    model: db.employments,
                    required: false
                },
                {
                    model: db.skills,
                    required: false
                }
            ]
        }]
    });
};

const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, bcrypt.genSaltSync(10));
    return await db.users.create({
        ...userData,
        password: hashedPassword
    });
};

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
};
