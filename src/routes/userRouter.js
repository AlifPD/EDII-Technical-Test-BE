const express = require('express')
const { getAll } = require('../controllers/userController')
const authJWT = require('../middlewares/authJWT')
const { restrictAccess } = require('../middlewares/accessController')
const router = express.Router()


router.get('/', authJWT, restrictAccess("ADMIN"), getAll)

module.exports = router