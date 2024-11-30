const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const connectionString = 'mongodb+srv://mattporteous44:Matthew.4483@portfoliocluster.5y4a2.mongodb.net/?retryWrites=true&w=majority&appName=PortfolioCluster';
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define Counter Schema and Model
const counterSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

// Routes
// Increment Counter
app.post('/increment', async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true } // Create if not exists
    );
    res.status(200).json({ count: counter.count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Current Count
app.get('/count', async (req, res) => {
  try {
    const counter = await Counter.findOne({});
    res.status(200).json({ count: counter ? counter.count : 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the portfolio backend!');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
