const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const { authUser, allUsers } = require('../Controllers/useControllers')
const { registerUser } = require('../Controllers/useControllers')
const router = express.Router()
router.route('/').get(protect, allUsers)

router.route('/').post(registerUser)
router.post('/login', authUser)

module.exports = router
