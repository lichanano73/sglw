// Invocamos express
const express = require('express');
const app = express();
const path = require('path');

//Seteamos urlencoded para capturar los datos
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//3 Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//4 El directorio public
app.use('/resourses',express.static('public'));
app.use('/resourses', express.static(__dirname + '/public'));

//5 Motor de plantillas ejs
app.set('view engine','ejs')

app.set('views', path.join(__dirname,'views'))

//6 Invocamos bcryptjs
const bcryptjs = require('bcryptjs');

//7 Var Session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//8 Conectamos Database
const connection = require('./database/db');

//9 Routes
app.use('/users',require('./routes/users'));

app.get('/',(req,res)=>{
    res.send('Holis Mundo!');
})


//Iniciamos Server
const port = 7000;
app.listen(port, (req,res)=>{
    console.log(`||sglw - corriendo en localhost:${port}`)
})

