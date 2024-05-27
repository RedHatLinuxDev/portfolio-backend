const express = require('express');
const bodyParser = require('body-parser');
const main = require('./src/helpers/db-connect');
var cors = require('cors')
const app = express()
require('dotenv').config()
const service = require("./src/routes/serviceRoutes")
const user = require("./src/routes/userRoutes")
const project = require("./src/routes/projectRoutes")
const upload = require("./src/routes/uploadRoute")
const port = process.env.PORT
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
// const allowedOrigins = ['http://localhost:3000', 'https://68f0-154-192-8-89.ngrok-free.app'];


// app.use(cors({
//     origin: function(origin, callback){
//       // allow requests with no origin (like mobile apps or curl requests)
//       if(!origin) return callback(null, true);
//       if(allowedOrigins.indexOf(origin) === -1){
//         const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     }
//   }));
app.get('/',(req,res)=>{
    console.log("portfolio backend")
})

app.use('/service', service)
app.use('/user',user)
app.use('/project',project)
app.use('/upload',upload)
main().catch(err => {
    console.error("An error occurred while connecting to the database", err);
});

app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})