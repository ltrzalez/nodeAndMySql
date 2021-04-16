const exprees = require('express');
const mysql = require('mysql');
//ponemos el server a la escucha
const app = exprees();
//
const cors = require('cors')
app.use(cors())

app.listen('3000', () =>{
    console.log('Server en puerto 3300');
})
//instanciamos la base de datos
var mysqlConexion = mysql.createConnection({
    host:'localhost',
    user :'root',
    password:'',
    database: 'rollsushi'
});
//conenctamos a la base de datos
mysqlConexion.connect((err)=>{
    if(!err){
        console.log('Conectado a la base de datos')
    }
    else
    console.log('error')
});


// deberia refactorizarlo, minimo usar try/catch 


//creamos una base de datos
app.get('crearBD', (req, res) =>{
    let sql = 'CREATE DATABASE rollsushi';
    mysqlConexion.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('creamos base de datos');
    });
});
//creamos una tabla
app.get('/crearTabla', (req, res) =>{
    let sql = 'CREATE TABLE productos(id int AUTO_INCREMENT, nombre VARCHAR(255), precio int, PRIMARY KEY(id))';
    mysqlConexion.query(sql, (err, result)=>{
        if(!err)
        console.log(result);
        else
        console.log(err)
    });
});
// insertamos una fila
app.get('/crearFila', (req, res) =>{
    let post = {nombre:'Futu', precio:'250'};
    let sql = 'INSERT INTO productos SET ?';
    let query = mysqlConexion.query(sql, post, (err, result)=>{
        if(!err)
        console.log(result);
        else
        res.send('Error')
    })
})
//insertarmos producto
app.get('/agregar/:name/:costo', (req,res) =>{
    let post = {nombre:req.params.name, precio:req.params.costo};
    let sql = 'INSERT INTO productos SET ?';
    let query = mysqlConexion.query(sql, post,(err, results)=>{
        if(err)
        console.log(err);
        else
        res.send(results)
    })
});
//cambiar valor
app.get('/update/:id/:name/:costo', (req,res)=>{
    let sql = `UPDATE productos SET nombre='${req.params.name}', precio='${req.params.costo}' WHERE id='${req.params.id}'`;
    let query = mysqlConexion.query(sql, (err, result)=>{
        if(!err)
        console.log(result);
        else
        res.send('Error')
    });
});

// selecionar fila
app.get('/damelosvalores', (req,res) =>{
    let sql = 'SELECT * FROM productos';
    let query = mysqlConexion.query(sql, (err, results)=>{
        if(err)
        console.log(err);
        else
        res.send(results)
    })
});
//selecionar item
app.get('/obtenervalor/:id', (req,res) =>{
    let sql = `SELECT * FROM productos WHERE id = ${req.params.id}`;
    let query = mysqlConexion.query(sql, (err, results)=>{
        if(err)
        console.log(err);
        else
        res.send(results)
    })
});

//borrar item
app.get('/borrar/:id', (req,res) =>{
    let sql = `DELETE FROM productos WHERE id='${req.params.id}'`
    let query = mysqlConexion.query(sql, (err, result)=>{
        if(!err)
        console.log(result);
        else
        res.send('error')
    })
})
