var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'biblioteca'
})

connection.connect(
    (err) => {
        if(!err){
            console.log('Conexion Establecida')
        } else {
            console.log('Error de conexión')
        }
    }
)

module.exports = connection