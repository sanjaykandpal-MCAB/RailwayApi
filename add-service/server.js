// add-service/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Railway'); // assuming you share models
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected for add service');
}).catch(err => console.log(err));

app.post('/railways', async (req, res) => {
  try {
    console.log('Recieved Data',req.body);
    const product = new Product(req.body);
    console.log('Stations after retrieval:', product.stations);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/suggestions', async (req, res) => {
  try {
    // Dummy data for testing
    const dummySuggestions = [
      "Grand Central Station",
      "Union Station",
      "Penn Station",
      "Chicago Union Station",
      "King's Cross Station"
    ];

    const { q } = req.query;

    if (!q || q.length < 3) {
      return res.json([]);
    }

    // Simulate filtering and limiting
    const filteredSuggestions = dummySuggestions.filter(name => 
      name.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);

    res.json(filteredSuggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ message: 'Error fetching suggestions' });
  }
});



app.listen(port, () => {
  console.log(`Add service is running on port: ${port}`);
});