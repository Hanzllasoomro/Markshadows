const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const asyncHandler = require('express-async-handler');

//register
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.json({
        success: false,
        message: 'user Already exists with same email address. Please try an other email!'
    });

    try {

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            userName, email, password: hashPassword,
        });

        await newUser.save();

        if (newUser) {
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'some error occured'
        });
    }
});


//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        username: user.userName, // adjust to your schema
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// logout
const logoutUser = (req, res) => {
    res.clearCookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

const getUserProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, no user found');
    }

    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({
        success: true,
        user,
    });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
};