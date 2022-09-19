import express  from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import cors  from 'cors';
import {credentials} from './credentials.js';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

app.use('/posts', postRoutes)
app.use('/users', userRoutes)
//credentials MongoDB Atlas
const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

//connecting to MongoDB Atlas
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`)))
    .catch((error)=>console.log(error.message));

//deprecated
//mongoose.set('useFindAndModify',false);
