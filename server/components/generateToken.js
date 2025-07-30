const jwt = require('jsonwebtoken');

const generateTokenResponse = (res, user, statusCode = 200) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  }.json({
    success : true,
    message : "Logged in Successfully",
    user : {
      email : user.email,
      role : user.role,
      id : user._id,
    }
  }));

  res.status(statusCode).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

module.exports = generateTokenResponse;
