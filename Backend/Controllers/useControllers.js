const asyncHandler = require('express-async-handler')
const User = require('../Models/userModel')
const generateToken = require('../config/generateToken')
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ]
      }
    : {}
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } })
  res.send(users)
})

const registerUser = asyncHandler(async (req, res) => {
  // Add req and res parameters
  const { name, email, password, pic } = req.body
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Please Enter all the Fields' }) // Fix typo "resizeBy" to "res"
    return
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400).json({ error: 'User already Exists' })
    return
  }

  const user = await User.create({
    name,
    email,
    password,
    pic
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    })
  } else {
    res.status(400).json({ error: 'User not found' })
  }
})

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
})

module.exports = { registerUser, authUser, allUsers }
