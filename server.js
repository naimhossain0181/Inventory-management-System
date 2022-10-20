const express=require("express")
const app=express()
const { readdirSync } = require("fs");

// import middlewares
const helmet=require("helmet")
const cors=require("cors")
require('dotenv').config()
const multer=require("multer")
const mongoose=require("mongoose")
const morgan=require("morgan")


// use middlewares
app.use(helmet())
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// database connect
mongoose.connect("mongodb://127.0.0.1:27017")
.then(()=>{console.log("Database Connected")})
.catch(()=>{console.log("Database Connection Fail")})

// route middlewares
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)));

// server
const port=process.env.PORT || 9090

app.listen(port,()=>console.log(`Server run ${port}`))