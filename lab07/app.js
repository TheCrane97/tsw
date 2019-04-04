//jshint esversion: 6, node: true
const express = require('express');
const app=express();

app.listen(3001,()=>{
    console.log("Nasluchuje")
});


app.post('/game/new',(rq,res)=>{
   return res.json({
        "game": "33c6e9c0-56c9-11e9-a8f5-b3a4822f0a29",
        "size": rq.size,
        "colors": rq.colors,
        "steps": rq.steps
    });
});



app.post('/game/move',(rq,res)=>{
    return res.json({
        "game": rq.game,
        "result":{
            "black": 1,
            "white": 2
        }
    })

})

app.post('/game/status',(rq,res)=>{

    

})
