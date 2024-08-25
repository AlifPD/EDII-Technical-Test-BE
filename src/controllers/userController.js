const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getAllUserBio } = require('../services/authServices')

const getAll = async (req, res) => {
    // const search = req.query.search || "";
    // const type = req.query.type || "ALL"
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10

    try {
        const allUsersBio = await getAllUserBio({page, limit});

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

module.exports = {
    getAll
}