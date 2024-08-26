const express = require('express')
const { getAll, getBio, createBio, updateBio, deleteBio } = require('../controllers/bioController')
const authJWT = require('../middlewares/authJWT')
const { restrictAccess } = require('../middlewares/accessController')
const router = express.Router()

router.get('/', authJWT, restrictAccess("ADMIN"), getAll)
router.get('/:id', authJWT, getBio)
router.post('/', authJWT, createBio)
router.put('/', authJWT, updateBio)
router.delete('/', authJWT, restrictAccess("ADMIN"), deleteBio)

module.exports = router