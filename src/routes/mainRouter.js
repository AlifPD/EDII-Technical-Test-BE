const express = require('express')
const router = express.Router()
const authRouter = require("./authRouter")
const bioRouter = require("./bioRouter")

router.use('/auth', authRouter)
router.use('/bio', bioRouter)

module.exports = router