const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useunifiedtopology: true
    };
    try{
        mongoose.connect(process.env.MONGODB_URL,connectionParams)
        console.log('Connected to Database Successfully!')
    }catch(e){
        console.log('could not connect to Database! error : '+e);
    }
}