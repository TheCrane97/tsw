//jshint esversion: 6, node: true
const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.listen(3000,()=>{
    console.log("Nasluchuje")
});



app.post('/game/new',jsonParser,(rq,res)=>{
    console.log(rq.body);

   return res.json({
        "game": "33c6e9c0-56c9-11e9-a8f5-b3a4822f0a29",
        "size": rq.body.size,
        "colors": rq.body.colors,
        "steps": rq.body.steps
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
