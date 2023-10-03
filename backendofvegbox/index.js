import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./reviewDAO.js"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import config from "./config.cjs"
import  express from "express"
import logger from "morgan"
import path from "cookie-parser"
import createError from "http-errors"
import subscribersRouter from './routes/subscribers.cjs'
import subRouter from "./models/subscriber.cjs"
// var ap = express();
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
 const db = mongoose.connection
 
 
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
    db.on('error', (error) => console.error(error))
  })
  .then(async client => {
    await ReviewsDAO.injectDB(client)
    app.use(express.json())
    app.use('/subscriber', subRouter)
    db.once('open', () => console.log('Connected to Database'))
    app.use('/subscribers', subscribersRouter)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })