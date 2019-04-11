//jshint esversion: 6, node: true
const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }



app.listen(3000,()=>{
    console.log("Nasluchuje")
});



app.post('/game/new',jsonParser,(rq,res)=>{
    rq.body.game=makeid(30);

   return res.json({
        "game": rq.body.game,
        "size": rq.body.size,
        "colors": rq.body.colors,
        "steps": rq.body.steps
    });
});




app.post('/game/move',jsonParser,(rq,res)=>{

    return res.json({
        "game": rq.body.game,
        "result": rq.body.result
    });
    

})


app.post('/game/status',jsonParser,(rq,res)=>{

    return res.json({
        "game": rq.body.game,
        "solved": rq.body.solved
    });
    

})

