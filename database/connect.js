const mongoose = require('mongoose');

if (process.env.ENV === "production") {
    mongoose.connect(process.env.DATABASE);
} else if (process.env.ENV === "development") {
    mongoose.connect('mongodb://localhost:27017/test');
}

module.exports = mongoose
