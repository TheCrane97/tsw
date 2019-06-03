//jshint esversion:6, node:true, devel: true

const express = require('express')
const parser = require('body-parser')
const morgan = require('morgan')
const uuid = require('uuid/v1');
const app = express();
const ocena = require('./compare');
const Game = require('./game');
const port = process.env.PORT || 3000;
const routes = require('./routes');
const newGame = require('./routes/newGame');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.use(parser.json())

app.get('/newGame', newGame.games());
app.get('/', routes.index());
app.get('/routeGame.js', );




let gamesMap = new Map();

app.post(('/game/new'), (req, res) => {
    let game = new Game(uuid(), req.body.size, req.body.colours, req.body.steps, false)
    gamesMap.set(game.id, game)
    res.json({
        game: game.id,
        size: req.body.size,
        colours: req.body.colours,
        steps: req.body.steps
    });
})
const toMap = (tab) => {

    tab.forEach((el,idx) => {
        if(!m.has(el))
        {
            m.set(el);
        }
        m.set(el,idx);
        console.log(m);
        
    });
    return m;
};

app.post(('/game/move'), (req, res) => {
    let game = gamesMap.get(req.body.game);
    let move = req.body.move;
    let compare = ocena(game.code)(move);
    
    game.steps -= 1;
    console.log(compare.czarne);
    if (game.steps == 0) {
        game.solved = true;
    }

    res.json({
        game: req.body.game,
        result: {
            black: compare.czarne,
            white: compare.białe
        }
    });
})

app.post(('/game/status'), (req, res) => {
    let game = gamesMap.get(req.body.game);
   
    res.json({
        game: req.body.game,
        solved: game.solved
    });
})



app.listen(3000, function () {
    console.log("info", 'Server is running at port : ' + 3000);
});

