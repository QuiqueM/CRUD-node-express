const res = require('express/lib/response')
var con = require('../config/conexion')
var libro = require('../model/libro')
var borrar = require('fs')

module.exports = {
    index: function(req,res){
        libro.obtener(con, function(err, datos){
            console.log(datos)
            res.render('libros/index', { title: 'Aplicacion', libros: datos })
        })
        
    }, 
    crear: function(req, res){
        res.render('libros/crear');
    }, 
    guardar: function(req, res){
        console.log(req.body);
        console.log(req.file.filename);
        libro.insertar(con,req.body,req.file, function(err){
            res.redirect('/libros');
        })
    }, 
    eliminar: function(req, res){
        console.log('Recepcion de dato');
        console.log(req.params.id);
        libro.retornarDatosID(con, req.params.id, function(err, registros){
            var Imagen = 'public/images/'+(registros[0].imagen)
            if(borrar.existsSync(Imagen)){
                borrar.unlinkSync(Imagen)
            }
            libro.borrar(con, req.params.id, function(err){
                res.redirect('/libros')
            })
        })
    }, 
    editar: function(req, res){
        libro.retornarDatosID(con, req.params.id, function(err, registros){
            res.render('libros/editar',{libro: registros[0]})
        })
        
    },
    actualizar: function(req,res){
        if(req.body.nombre){
            libro.actualizar(con, req.body, function(err){})
        }
        if(req.file){
            if(req.file.filename){
                libro.retornarDatosID(con, req.body.id, function(err, registros){
                    var Imagen = 'public/images/'+(registros[0].imagen)
                    if(borrar.existsSync(Imagen)){
                        borrar.unlinkSync(Imagen)
                    }
                    libro.actualizarArchivo(con, req.body,req.file,function(err){})
                })
               
            }
        }
        res.redirect('/libros')
        
    }
}