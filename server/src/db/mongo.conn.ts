import { MongoClient } from "mongodb";
import { errorHandler } from "../utils/helpers/errorHandler";

// env constants
const uri: string = process.env.ATLAS_URI || "";
const dbName: string = process.env.DB_NAME || "";

const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log(`\x1b[33mSuccessfully connected! \n \x1b[0m`);
  })
  .catch((error) => errorHandler(error));

const db = client.db(dbName);

export default db;
