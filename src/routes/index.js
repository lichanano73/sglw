const express = require('express');
const router = express.Router();

router.use('/users',require('./users'));

router.get('/',(req,res)=>{
    if(req.session.logerid){        
        res.render('index', {
            titulo: 'Home',
            login: true,
            name: req.session.name
        })
    }else{
        res.render('index', {
            titulo: 'HFalse',
            login: false,
            name: 'Debe Iniciar Sesion'
        })
    }    
})


module.exports = router;