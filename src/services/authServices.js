const bcrypt = require('bcrypt');
const db = require('../database/models/index');

const getAllUserBio = async (params) => {
    const queryCount =
        `
            SELECT COUNT(*) as total 
            FROM bio 
        `

    const usersBio = await db.bio.findAll({
        limit: params.limit,
        offset: params.offset,
        include: [
            {
                model: db.educations,
                required: false,
                attributes: {
                    exclude: ["id"]
                },
            },
            {
                model: db.trainings,
                required: false,
                attributes: {
                    exclude: ["id"]
                },
            },
            {
                model: db.employments,
                required: false,
                attributes: {
                    exclude: ["id"]
                },
            },
            {
                model: db.skills,
                required: false,
                attributes: {
                    exclude: ["id"]
                },
            }
        ]
    });
    const totalUsersBio = await db.sequelize.query(queryCount, {
        type: db.sequelize.QueryTypes.SELECT
    })

    return {
        data: usersBio,
        total: totalUsersBio[0].total
    }
};

const getUserByEmail = async (email) => {
    return await db.users.findOne({
        where: { email },
        include: [{
            model: db.bio,
            required: false,
            attributes: {
                exclude: ["id"]
            },
            include: [
                {
                    model: db.educations,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
                },
                {
                    model: db.trainings,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
                },
                {
                    model: db.employments,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
                },
                {
                    model: db.skills,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
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
            attributes: {
                exclude: ["id"]
            },
            include: [
                {
                    model: db.educations,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
                },
                {
                    model: db.trainings,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
                },
                {
                    model: db.employments,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
                },
                {
                    model: db.skills,
                    required: false,
                    attributes: {
                        exclude: ["id"]
                    },
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
    getAllUserBio,
    getUserByEmail,
    getUserById,
    createUser
};
