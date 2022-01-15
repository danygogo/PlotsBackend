const mongoose = require("mongoose");

const dbConnection = async() =>{

    try{
        await mongoose.connect('mongodb+srv://secondUser:ulPuGSxgYfxGQPVj@cluster0.bx7ng.mongodb.net/plotUsers',
        {
            useNewUrlParser: true,
            useUnifiedTopology:true
            //useCreateIndex: true
            });
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