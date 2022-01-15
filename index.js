const express = require("express") ;
const cors = require("cors");
const path = require("path");
const {dbConnection} = require("./database/config")
require("dotenv").config()




//server
const app = express();

//database
dbConnection()


app.use(express.static("public"))


app.use( cors() );
app.use(express.json());


app.use( "/api/auth", require("./routes/auth") );

app.get("*", (req, resp)=>{
    resp.sendFile(path.resolve(__dirname, "public/index.html"))
})




app.listen(process.env.PORT, ()=>{
    console.log(`Using port ${process.env.PORT}`)
})



