import express  from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import cors  from 'cors';
import {credentials} from './credentials.js';

import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes)

app.use(bodyParser.json({limit: "30mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());

//credentials MongoDB Atlas
const CONNECTION_URL = credentials.connection;
const PORT = process.env.PORT || 5000;

//connecting to MongoDB Atlas
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server listening on ${PORT}`)))
    .catch((error)=>console.log(error.message));

//deprecated
//mongoose.set('useFindAndModify',false);
