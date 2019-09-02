const express = require('express');
const port = process.env.PORT || 4000;
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
const baza = require('./baza');
const DB = baza.db;
const select=baza.selectByLogin;
const io = require("./socketIO");
const sum = require('./sumowanie');
const config = require('./config');
const jwt = require('jsonwebtoken');


const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
app.use('/admin/sedziowie', require('./router/sedziowie'));
app.use('/admin/konie', require('./router/konie'));
app.use('/admin/klasy', require('./router/klasy'));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

app.use(allowCrossDomain)

app.post('/login', (req, res) => {
    select(req.body.email, ( user) => {
        //console.log(user);
        if (!user) return res.status(404).send('No user found.');
        let passwordIsValid = req.body.password === user.haslo;
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token, user: user.login });
    });
})

//Generator Danych
app.get('/admin/generuj', (req, res) => {

    DB.removeCollection('Klasy');
    DB.removeCollection('Sedziowie');
    DB.removeCollection('Konie');
    DB.addCollection('Klasy');
    DB.addCollection('Sedziowie');
    DB.addCollection('Konie');

    axios.get('http://localhost:3000/sedziowie')
        .then(resp => {
            let data = resp.data;
            data.forEach(element => {
                delete element.id;
                DB.getCollection('Sedziowie').insert(element);
            });
        }).then(() => {
            axios.get('http://localhost:3000/klasy')
                .then(resp => {
                    let data = resp.data;
                    data.forEach(element => {
                        delete element.id;
                        element.oceniono = -1;
                        DB.getCollection('Klasy').insert(element);
                    });
                }).then(() => {
                    axios.get('http://localhost:3000/konie')
                        .then(resp => {
                            let data = resp.data;
                            data.forEach(element => {
                                delete element.id;
                                element.oceniono = false;
                                DB.getCollection('Konie').insert(element);
                            });
                        }).then(() => {
                            io.emit('Wyzeruj');
                            return res.json({
                                sedziowie: DB.getCollection('Sedziowie').find({}),
                                konie: DB.getCollection('Konie').find({}),
                                klasy: DB.getCollection('Klasy').find({})
                            });
                        })
                        .catch(err => console.log(`Błąd: ${err}`))
                })
                .catch(err => console.log(`Błąd: ${err}`))
        })
        .catch(err => console.log(`Błąd: ${err}`))

});




//Socket
io.on('connection', function (socket) {
    socket.emit('MaszOcenioneKlasy', DB.getCollection("Klasy").find({
        "oceniono": 1
    }));
    socket.emit('Aktualna', DB.getCollection("Klasy").findOne({
        "oceniono": 0
    }));



    socket.on('DajKonie', function (a) {
        let konie = DB.getCollection("Konie").find({
            "klasa": a.klasaId
        })

        let ocenione = konie.filter(e => {
            return e.oceniono;
        })

        const sortowanie = (k1, k2) => {
            let ssk1 = sum.suma(k1);
            let ssk2 = sum.suma(k2);
            let stk1 = sum.sumaTyp(k1);
            let stk2 = sum.sumaTyp(k2);
            let srk1 = sum.sumaRuch(k1);
            let srk2 = sum.sumaRuch(k2);
            let sgk1 = sum.sumaGlowa(k1);
            let sgk2 = sum.sumaGlowa(k2);
            let skk1 = sum.sumaKloda(k1);
            let skk2 = sum.sumaKloda(k2);
            let snk1 = sum.sumaNogi(k1);
            let snk2 = sum.sumaNogi(k2);

            if (ssk1 > ssk2) {
                return -1;
            } else if (ssk1 === ssk2) {
                if (stk1 > stk2) {
                    return -1;
                } else if (stk1 === stk2) {
                    if (srk1 > srk2) {
                        return -1;
                    } else if (srk1 === srk1){
                        if (sgk1 > sgk2) {
                            return -1;
                        } else if (skk1 === skk2){
                            if (snk1 > snk2) {
                                return -1;
                            }
                        }
                    }
                }
            }
            return 1;
        
        }

        ocenione.forEach(e => {
            e.suma = sum.suma(e);
            e.sumaRuch = sum.sumaRuch(e);
            e.sumaTyp = sum.sumaTyp(e);
            e.sumaGlowa = sum.sumaGlowa(e);
            e.sumaKloda = sum.sumaKloda(e);
            e.sumaNogi = sum.sumaNogi(e);
        });

        ocenione.sort(sortowanie);

        let nieOcenione = konie.filter(e => {
            return !e.oceniono;
        })


        let tablica = [...ocenione, ...nieOcenione];

        if (a.wybor) {
            socket.emit('MaszKonie', tablica);
        } else {
            socket.emit('MaszAktualne', ocenione);
        }
    });



});


app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}.`);
});