import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number; //? can make it optional can be empty
};

const connection: ConnectionObject = {}; //initially empty bcaz of ? in connectionobject we can typescript it

//<void> means ,we dont care what type of data is returning
async function dbConnect(): Promise<void> {
  //connection already made
  if (connection.isConnected) {
    console.log("Using existing connection to database");
    return;
  }

  //new connection
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});//{} for options in mongodb

    connection.isConnected = db.connections[0].readyState;//setting connection state//ready state is a number//can make true false also for simplicity

    console.log("Connected to database succesfully");
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1); //we cannot do anyting without dbconnection
  }
}

export default dbConnect;
