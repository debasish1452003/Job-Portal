import mongoose from "mongoose";
import colors from "colors";

// Define an async function for connecting to the database
const ConnectDatabase = async () => {
  try {
    // Connect to mongoDB server
    const data = await mongoose.connect(process.env.DB_URI);

    // Log the Succesfull Connection
    console.log(
      colors.bgGreen.white(
        `MongoDB connected with server: ${data.connection.host}`
      )
    );
  } catch (error) {
    console.error(
      colors.bgRed.white(`Error connecting to MongoDB: ${error.message}`)
    );
  }
};

export default ConnectDatabase;
