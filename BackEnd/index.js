import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewDAO.js"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
// import config from "./config.js"
// import { database, database_PASSWORD, masterKey, port } from './config.js'
const MongoClient = mongodb.MongoClient
// const mongo_username = process.env['MONGO_USERNAME']
// const mongo_password = process.env['MONGO_PASSWORD']
// const uri =
//   typeof process.env.DATABASE === 'string' ? process.env.DATABASE.replace('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD) : '';
// const uri = process.env.DATABASE.replace('DATABASE_PASSWORD', process.env.DATABASE_PASSWORD);
// load_dotenv()
dotenv.config();
// const { DATABASE, masterKey, port } = process.env;
console.log(process.env.DATABASE)

const uri = process.env.DATABASE
const port = 8000

MongoClient.connect("mongodb://localhost:27017/FirstDB", {
   useNewUrlParser: true,
   useUnifiedTopology: true
 })

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })