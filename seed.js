const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const dbUri = 'mongodb+srv://pranavgosai01:nexLAidCDDyTxpXt@cluster0.y4ep2.mongodb.net/restaurant?retryWrites=true&w=majority';

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const MenuItem = mongoose.model('MenuItem', new mongoose.Schema({
  name: String,
  nameGujarati: String,
  price: String,
  category: String,
}));

const seedData = [
  { name: 'Mineral Water', nameGujarati: 'મિનરલ વોટર', price: '₹20-00', category: 'beverages' },
  { name: 'Cold Drinks', nameGujarati: 'કોલ્ડ ડ્રિંક્સ', price: '₹25-00', category: 'beverages' },
  { name: 'Butter Milk', nameGujarati: 'છાશ', price: '₹30-00', category: 'beverages' },
  // Add more items here
];

MenuItem.insertMany(seedData)
  .then(() => {
    console.log('Data seeded');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  });
