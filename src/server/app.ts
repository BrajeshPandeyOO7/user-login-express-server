import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MONGO_URI, PORT } from '../config/index';
import globalRoutconfig from '../routes/route';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR, access-token")
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', '*')
  }
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE")
    return res.status(200).json({})
  }
  next()
});

mongoose.connect(MONGO_URI, {
    dbName: 'user-db'
  })
  .then(res => {
    console.log('db connected!');
  })
  .catch(err => {
    console.log('error while db connected!', err)
});

globalRoutconfig(app);

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`)
})
