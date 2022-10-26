const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cancer-blog'); 

module.exports = mongoose.connection;   