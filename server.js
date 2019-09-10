const express = require('express');
const mongoose = require('mongoose');
const expressGraphQL = require('express-graphql');
const models = require('./models');
const isAuth = require('./middleware/is-auth');
const bodyParser = require('body-parser');
var cors = require('cors');


const PORT = 3001;
const app = express();
const User = mongoose.model('User');
const schema = require('./schema');

const dbRoute = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-bz3zq.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.set('useCreateIndex', true);
mongoose.connect(dbRoute, { useNewUrlParser: true }).then(()=>{
    console.log('Connected to DB!');
}).catch(err =>{
    console.log(err);
});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(isAuth);

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

app.get('/secret', (req,res)=>{
    console.log(req.isAuth);
    res.json({
        'hello':'hello'
    })
})

app.get('/', (req,res) => {
    res.send('Hello world!');
})

// launch our backend into a port
app.listen(PORT, () => console.log(`Listening ${PORT}`));