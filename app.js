const express = require('express')
const dotenv = require('dotenv')
const connectMongoDB = require('./config/mongodb')


// Load config
dotenv.config({ path: './config/config.env' })

connectMongoDB()

const app = express()

const PORT = process.env.PORT || 5565

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))