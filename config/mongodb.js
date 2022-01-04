const mongoose = require('mongoose')

const connectMongoDB = async () => {
    try {
        const connMongoDB = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connMongoDB.connection.host}`)
    }catch (err){
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log("connection with to database is a success")
    }
}

module.exports = connectMongoDB