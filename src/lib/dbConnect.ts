import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number; //? can make it optional can be empty
};

const connection: ConnectionObject = {}; //initially empty bcaz of ? we can typescript it

//<void> means ,we dont care what type of data is returning
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Using existing connection to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1); //we cannot do anyting without dbconnection
  }
}

export default dbConnect;
