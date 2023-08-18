const mongoose = require('mongoose');

if (process.env.ENV === "production") {
    mongoose.connect(process.env.DATABASE).then(() => {
        console.log("Connect to atlas successfully");
    }).catch((e) => {
        console.error(e);
    })
} else if (process.env.ENV === "development") {
    mongoose.connect('mongodb://127.0.0.1/test').then(()=>{
        console.log(`successfully connected`);
    }).catch((e)=>{
        console.log(e);
    });
}

module.exports = mongoose
