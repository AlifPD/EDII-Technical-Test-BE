const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllBio, getBioById, getBioByUserId, createBioByUserId, updateBioByUserId, deleteBioByUserId, createEducationsByUserId, createEmploymentsByUserId, createTrainingsByUserId, createSkillsByUserId } = require('../services/bioServices')

const getAll = async (req, res) => {
    // const search = req.query.search || "";
    // const type = req.query.type || "ALL"
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    try {
        const allUsersBio = await getAllBio({ page, limit });

        return res.status(200).json({
            info: "All users retrieved",
            data: {
                result: allUsersBio.data,
                total: allUsersBio.total
            }
        });
    } catch (err) {
        return res.status(500).json({
            info: err.message
        });
    }
};

const getBio = async (req, res) => {
    const { id } = req.params

    try {
        if (!id) {
            return res.status(400).json({
                info: 'Data provided not sufficient'
            });
        }

        const bioData = await getBioByUserId(id);
        if (!bioData) {
            return res.status(409).json({
                info: 'Bio doesn\'t exist'
            });
        }

        return res.status(200).json({
            info: "Bio retrieved",
            data: {
                bioData
            }
        });
    } catch (err) {
        return res.status(500).json({
            info: err.message
        });
    }
};

const createBio = async (req, res) => {
    const requiredFields = [
        'position',
        'name',
        'id_number',
        'birthday',
        'birthplace',
        'religion',
        'bloodtype',
        'maritalstatus',
        'id_address',
        'domicile',
        'phone_number',
        'relocate_consent',
        'expected_salary',
        'signature',
        'educations',
        'employments',
        'skills',
        'trainings'
    ];

    const validate = requiredFields.filter(field => !req.body[field]);
    if (validate.length > 0) {
        return res.status(400).json({
            info: 'Data provided not sufficient'
        });
    }

    const {
        educations,
        employments,
        skills,
        trainings,
        ...bioParams
    } = req.body

    try {
        const bioCreated = await createBioByUserId({
            user_id: req.user.id,
            ...bioParams
        });

        const educationsCreated = await createEducationsByUserId(educations.map((item => {
            return {
                ...item,
                bio_id: bioCreated.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })))

        const employmentsCreated = await createEmploymentsByUserId(employments.map((item => {
            return {
                ...item,
                bio_id: bioCreated.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })))

        const trainingsCreated = await createTrainingsByUserId(trainings.map((item => {
            return {
                ...item,
                bio_id: bioCreated.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })))

        const skillsCreated = await createSkillsByUserId(skills.map((item => {
            return {
                ...item,
                bio_id: bioCreated.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })))

        return res.status(201).json({
            info: 'Successfully create new bio',
            data: {
                bioCreated,
                educationsCreated,
                employmentsCreated,
                skillsCreated,
                trainingsCreated
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            info: err.message
        });
    }
}

const updateBio = async (req, res) => {
    const { user_id } = req.body

    try {
        if (!user_id) {
            return res.status(400).json({
                info: 'Data provided not sufficient'
            });
        }

        const bioUpdated = await updateBioByUserId({
            user_id: user_id,
            ...req.body
        });

        if (bioUpdated[0] === 0) {
            return res.status(404).json({
                info: 'Bio not found and/or No changes were made'
            });
        }

        return res.status(201).json({
            info: 'Successfully update bio',
            data: {
                bioUpdated,
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            info: err.message
        });
    }
}

const deleteBio = async (req, res) => {
    const { user_id } = req.body

    try {
        if (!user_id) {
            return res.status(400).json({
                info: 'Data provided not sufficient'
            });
        }

        const bioDeleted = await deleteBioByUserId(user_id);

        if (bioDeleted === 0) {
            return res.status(404).json({
                info: 'Bio not found and/or No changes were made'
            });
        }

        return res.status(201).json({
            info: 'Successfully update bio',
            data: {
                bioDeleted,
            }
        });

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            info: err.message
        });
    }
}

module.exports = {
    getAll,
    getBio,
    createBio,
    updateBio,
    deleteBio
}