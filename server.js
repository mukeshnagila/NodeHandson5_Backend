
    const express = require("express");
    const socket = require("socket.io");
    const app = express();
    const PORT = 5006


    app.get("/", (req,res) => {
        res.send("Api is running fine")
    })

    const server = app.listen(PORT, () => {
                        try{
                            console.log(`server is running fine by PORT No - ${PORT}`);
                        }catch(err){
                            console.log(`Error in Starting Server ${err}`);
                        }
                    })

    const io = socket(server, {
        cors: {
            origin: "*"
        }
    })


    io.on("connection", (socketClient) => {
        console.log(socketClient.id);
        socketClient.on("Message", (serverdata) => {
            console.log(serverdata);
            socketClient.emit("Msg", "Hello I Am From Server")
        })

        socketClient.on("broadcastmessage" , (broadcastmessage) => {
            console.log(broadcastmessage);
            io.emit("broadcastmessage", broadcastmessage)
        })
        
    })

