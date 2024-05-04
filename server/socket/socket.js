import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log(socket.id)

    socket.on("disconect",()=>{
        console.log("A user disconeccted")
    })
})

export {app,io,server}





