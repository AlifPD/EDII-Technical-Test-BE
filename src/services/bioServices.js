const bcrypt = require('bcrypt');
const db = require('../database/models/index');
const { validate } = require('uuid');

const getAllBio = async (params) => {
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
            },
            {
                model: db.trainings,
                required: false,
            },
            {
                model: db.employments,
                required: false,
            },
            {
                model: db.skills,
                required: false,
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

const getBioById = async (id) => {
    const usersBio = await db.bio.findByPk({
        where: { id },
        include: [
            {
                model: db.educations,
                required: false,
            },
            {
                model: db.trainings,
                required: false,
            },
            {
                model: db.employments,
                required: false,
            },
            {
                model: db.skills,
                required: false,
            }
        ]
    });

    return {
        data: usersBio,
        total: totalUsersBio[0].total
    }
};

const getBioByUserId = async (user_id) => {
    const usersBio = await db.bio.findOne({
        where: { user_id },
        include: [
            {
                model: db.educations,
                required: false,
            },
            {
                model: db.trainings,
                required: false,
            },
            {
                model: db.employments,
                required: false,
            },
            {
                model: db.skills,
                required: false,
            }
        ]
    });

    return {
        data: usersBio,
        total: totalUsersBio[0].total
    }
};

const createBioByUserId = async (params) => {
    return await db.bio.create({
        ...params
    });
};

const createEducationsByUserId = async (params) => {
    return await db.educations.bulkCreate(params, {
        returning: true,
        validate: true
    })
};

const createEmploymentsByUserId = async (params) => {
    return await db.employments.bulkCreate(params, {
        returning: true,
        validate: true
    })
};

const createTrainingsByUserId = async (params) => {
    return await db.trainings.bulkCreate(params, {
        returning: true,
        validate: true
    })
};

const createSkillsByUserId = async (params) => {
    return await db.skills.bulkCreate(params, {
        returning: true,
        validate: true
    })
};

const updateBioByUserId = async (params) => {
    return await db.bio.update(
        {
            ...(params.position && { position: params.position }),
            ...(params.name && { name: params.name }),
            ...(params.id_number && { id_number: params.id_number }),
            ...(params.birthday && { birthday: params.birthday }),
            ...(params.birthplace && { birthplace: params.birthplace }),
            ...(params.religion && { religion: params.religion }),
            ...(params.bloodtype && { bloodtype: params.bloodtype }),
            ...(params.maritalstatus && { maritalstatus: params.maritalstatus }),
            ...(params.id_address && { id_address: params.id_address }),
            ...(params.domicile && { domicile: params.domicile }),
            ...(params.phone_number && { phone_number: params.phone_number }),
            ...(params.relocate_consent && { relocate_consent: params.relocate_consent }),
            ...(params.expected_salary && { expected_salary: params.expected_salary }),
            ...(params.signature && { signature: params.signature }),
        },
        {
            where: {
                user_id: params.user_id
            }
        }
    );
}

const deleteBioByUserId = async (user_id) => {
    return await db.bio.destroy({
        where: {
            user_id: user_id
        }
    });
}

module.exports = {
    getAllBio,
    getBioById,
    getBioByUserId,
    createBioByUserId,
    updateBioByUserId,
    deleteBioByUserId,
    createEducationsByUserId,
    createEmploymentsByUserId,
    createSkillsByUserId,
    createTrainingsByUserId
}