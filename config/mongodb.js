const {mongoose} = require('mongoose')

module.exports = async () => {

    try {
        // Connect to the MongoDB cluster
         await mongoose.connect(
          process.env.MONGODB_ATLAS_CONNECTION_URL,
          {
              useNewUrlParser: true,
            useUnifiedTopology: true,
         },
          (err) => {
              if (err)
              console.log(err);
              else console.log("Connected to MongoDB Atlas");
          }
        );
    
      } catch (err) {
        console.log("unalbe to connect to MongoDB", err);
      }
}


