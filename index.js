const express = require('express')
const app = express()
const port = 5000

const http = require('http').Server(app)
const cors = require('cors')
const SocketIo = require('socket.io')

app.use(cors())

const socket =SocketIo(http,{
    cors:{
        origin:"*"
    }
})
let arr = []
socket.on('connection',(socket)=>{
    
    arr.push(`${socket.id}`)
    console.log(arr)
    socket.on('message',(item)=>{
        console.log(item)
    })
    socket.on('disconnect',(client)=>{
        arr = arr.filter((item)=>item!=socket.id)
        console.log(`user ${socket.id} disconnected`)
    })
})
app.get('/api',(req,res)=>{
    res.json({
        message:'Hello world'
    })
})
http.listen(port,()=>{
    console.log(`Server listening on ${port}`);
})