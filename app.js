const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/authRoutes')
//const {sendMail} = require("./services/sendMail")
var cors = require('cors')

const app = express()

//middleware
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.url);
    next();
})
app.use(express.json())
app.use(router)


//const localUrl = "mongodb://localhost:27017/circlebook-waas"
const mongoUrl = "mongodb+srv://circlebook-waas:circlebook123@waas-backend.9gxb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
var port = process.env.PORT || 5000;

mongoose.connect(mongoUrl)
mongoose.connection.once("open",() => {
    console.log("Database Connected Successfully")
    app.listen(port)
}).on("error",(error) => {
    console.log("Error : ",error)
})

// app.get('/',(req,res) => {
//     res.send("<h1>hello</h1>")
// })
