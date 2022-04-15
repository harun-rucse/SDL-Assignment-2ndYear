const mongoose = require('mongoose');

function dbConnection() {
  mongoose
    .connect('mongodb://localhost:27017/assignment', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch((err) => {
      console.log('DB connection fail!' + err);
    });
}

module.exports = dbConnection;
