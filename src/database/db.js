const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sglw'
}); 
 
connection.connect((error)=>{
    if(error){
        console.log('Error de conexion: '+error);
        return;
    }
    console.log('* Database conectada *')
})

module.exports=connection;