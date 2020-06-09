const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

// Routes
const users = require('./routes/api/users');

const { mongoURI } = require('./config/keys');

require('./services/passport');

/* -------------------------------------------------------------------------- */

const app = express();

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    throw new Error(err);
  });

// Midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/users', users);

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Start server
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
