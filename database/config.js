const mongoose = require('mongoose');

const dbConnection = async() =>{
    try{
        await mongoose.connect( process.env.DB_CNN, {
                        useNewUrlParser: true, 
                        useUnifiedTopology: true,
                        useCreateIndex: true
                    });
        console.log('Db Connected');

    } catch{
        console.log(error);
        throw new Error("Error");
    }
    
}

module.exports = {
    dbConnection
}