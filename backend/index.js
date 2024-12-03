const cors = require('cors');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS setup to allow requests from localhost:5173
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests only from your frontend
  methods: ['GET', 'POST'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy users for demonstration
const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com', password: '$2a$10$u4obmNKJlXY3X9tG8jx8eOm6G69ZbK9d/K1G0Ed3FkD3ld1CGmrF6', role: 'admin' },
];

// Register route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if email already exists
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user and add to the dummy users array
  const newUser = { id: users.length + 1, name, email, password: hashedPassword, role: 'user' };
  users.push(newUser);

  // Generate JWT token
  const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Send user data and token as response
  res.status(201).json({
    user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
    token,
  });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
