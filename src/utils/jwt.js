const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is missing');
  }

  const expiresIn = process.env.JWT_EXPIRE || '1d';

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  return token;
};
