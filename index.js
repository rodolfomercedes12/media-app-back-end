const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(express.json());
const server = require("http").createServer(app);

const { dbConnection } = require("./database/config");
dbConnection();

 

app.use( "/api/login", require("./routes/auth") );
app.use( "/api/media", require("./routes/media") );


module.exports.io = require('socket.io')(server);
require("./sockets/socket");

//Path publica
const publicPath = path.resolve(  __dirname, "public");

app.use( express.static( publicPath ) );

server.listen(process.env.PORT, (err) => {
    if( err ){
        throw new Error( err );
    }
    console.log("Corriendo en puerto", process.env.PORT);
});