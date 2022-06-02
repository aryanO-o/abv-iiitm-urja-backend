const {mongoose} = require('mongoose')

module.exports = async () => {
    await mongoose.connect(
        process.env.MONGODB_ATLAS_CONNECTION_URL, () => {
            console.log('Connected to MongoDB Atlas. ')
        }
    ).catch(err => {
        console.log('Error connecting to MongoDB Atlas:', err.message)
    })
}


