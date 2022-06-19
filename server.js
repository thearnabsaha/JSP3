const express = require('express')
const path = require('path');
const app = express()
const http=require("http").createServer(app)
const PORT = process.env.PORT || 3000
http.listen(PORT , ()=> console.log(`> Server is up and running on PORT : ${PORT}`))
app.use(express.static(path.join(__dirname,"public")))
app.get('/' , (req , res)=>{res.sendFile(path.join(__dirname,"index.html"))})

const io = require('socket.io')(http)
io.on("connection",(socket)=>{
    console.log("connected!!!");
    socket.on("message",(msg)=>{
        // console.log(msg);
        socket.broadcast.emit("message",msg)
    })
})