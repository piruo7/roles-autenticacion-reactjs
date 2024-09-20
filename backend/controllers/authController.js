const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiration } = require('../config');

// Usuarios para pruebas
const users = [
  { id: 1, email: 'admin@mail.com', password: bcrypt.hashSync('admin123', 8), role: 'admin' },
  { id: 2, email: 'user@mail.com', password: bcrypt.hashSync('user123', 8), role: 'user' }
];

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpiration });
  res.json({ token, role: user.role });
};
