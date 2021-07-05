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

//Iniciar Sesion
router.post('/login', async(req,res)=>{

    const user = req.body.user;
    const pass = req.body.pass;

    let passhash = await bcryptjs.hash(pass,10);

    if(user && pass){

        connection.query('SELECT * FROM users WHERE user = ?',[user], async (error,results)=>{

            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                //res.send('Usuario y/o Password Incorrectas')

                res.render('./auth/login', {
                    alert: true,
                    alertTitle: 'Error',
                    alerteMessage: 'Usuario y/o Password Incorrectos',
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'users'
                });

            }else{
                //res.send('Bienvenido a SGLW')

                req.session.logerid = true;
                req.session.name = results[0].name;
                res.render('./auth/login', {
                    alert: true,
                    alertTitle: 'Sesion Iniciada!',
                    alerteMessage: 'Bienvenido a sglw',
                    alertIcon: 'success',
                    showConfirmButton: true,
                    timer: false,
                    ruta: ''
                });
            }

        });
    }
    
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

    connection.query('INSERT INTO users SET ?', [user], async(error,result)=>{

        if(error){
            console.log(error);
        }else{
            res.render('./auth/login',{
                alert: true,
                alertTitle: 'Registracion',
                alerteMessage: 'El registro fue exitoso!',
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }

    });
});

module.exports = router;