const jwt = require('jsonwebtoken');
const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
exports.generateToken = (user) => {
  const token = jwt.sign(
  { id: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn }
);
};
