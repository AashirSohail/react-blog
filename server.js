const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/routes');
//server
const app = express();
const PORT = process.env.PORT || 8080;

//mongoDB
const MONGO_URI = 'mongodb+srv://aashir:blogDB@react-graphql-blog.qmjxs.mongodb.net/react-graphql-blog?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',() => {
    console.log('Mongoose all ready to go.')
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('tiny'));
app.use('/api',routes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

//Start
app.listen(PORT,console.log(`Server Started @ ${PORT}`))