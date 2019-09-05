const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const models = require('./models');
const passport = require('passport');
const bodyParser = require('body-parser');
var cors = require('cors');


const PORT = 3001;
const app = express();
const User = mongoose.model('User');
const schema = require('./schema');

const dbRoute = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-bz3zq.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.set('useCreateIndex', true);
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var George = new User({
    name: 'George'
})

const filter = { name: 'George' };

// User.findById('5d66f02443e3ed6baf7c2dac').then(user => {
//     console.log(user);
// })

// George.save((err,user)=> {
//     if (err){
//         console.log("Something went wrong!")
//     }else{
//         console.log(user)
//     }
// })

app.use(cors());

app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

app.use(bodyParser.urlencoded({extended:true}));


app.post('/register', (req,res)=>{
    req.body.username
    req.body.password
    //User.register(new)
})

app.get('/', (req,res) => {
    res.send('Hello world!');
})

// launch our backend into a port
app.listen(PORT, () => console.log(`Listening ${PORT}`));