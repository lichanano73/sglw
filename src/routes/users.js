const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const connection = require('../database/db');

router.get('/',(req,res)=>{
    res.render('./auth/login');
});
router.post('/',(req,res)=>{
    res.send('Iniciando sesion')
});


//Registrar Usuario
router.get('/register',(req,res)=>{
    res.render('./auth/register');
});
router.post('/register', async(req,res)=>{
    const username = req.body.user;
    const fullname = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;

    let passhash = await bcryptjs.hash(pass,10);

    const user = {
        user: username,
        name: fullname,
        rol: rol,
        pass: passhash
    };


    connection.query('INSERT INTO users SET ?',[user]);


    res.send(user)
});

module.exports=router;