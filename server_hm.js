const express = require('express');
const app = express(); 
const server = require('http').createServer(app);

const io = require("socket.io")(server,{
    cors:{
        // origin: ['https://consultorio.zitacuaro.tecnm.mx/estudiante/','https://consultorio.zitacuaro.tecnm.mx/medico/']
        origin: 'https://consultorio.zitacuaro.tecnm.mx/'
    }
});

app.get('https://consultorio.zitacuaro.tecnm.mx/server_sockets',(req,res)=>{
    res.send('<h1>Servidor iniciado.</h1>');
});

io.on('connection',(socket)=>{
    // Se define el evento y se recibe la información
    socket.on('server calendar update',(data)=>{
        // Se emite a los clientes que accedan al evento
        io.emit('client calendar update',data);
    });
});

server.listen(3000,()=>{
    console.log('Escuchando en el puerto 3000');
});