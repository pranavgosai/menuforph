const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Replace with your MongoDB Atlas connection string
const dbUri = 'mongodb+srv://pranavgosai01:nexLAidCDDyTxpXt@cluster0.y4ep2.mongodb.net/restaurant?retryWrites=true&w=majority';

// Mongoose connection
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose connection event listeners
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Mongoose is connected to the database.');
});
db.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});
db.on('disconnected', () => {
  console.log('Mongoose is disconnected from the database.');
});

const MenuItem = mongoose.model('MenuItem', new mongoose.Schema({
  name: String,
  nameGujarati: String,
  price: String,
  category: String,
}));

app.get('/api/menu', async (req, res) => {
  const category = req.query.category;
  const menuItems = await MenuItem.find(category ? { category } : {});
  res.json(menuItems);
});

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
