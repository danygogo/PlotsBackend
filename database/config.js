const mongoose = require("mongoose");

const dbConnection = async() =>{

    try{
        await mongoose.connect(process.env.BD_CNN),{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex: true
        
            };

        console.log("Database working")

    }
    catch(error){
        console.log(error);
        throw new Error("We had some problems with de database");
    }

}


module.exports = {
    dbConnection
}