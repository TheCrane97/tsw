const express = require('express');
const router = express.Router();
const baza = require('../baza');
const DB = baza.db;
const io = require("../socketIO");

router.get('/', (req, res) => {
    return res.json(DB.getCollection('Klasy').chain().simplesort('numer', false).data());
});

router.post('/', (req, res) => {
    let klasy = DB.getCollection('Klasy');
    let max = 0;

    klasy.find({}).forEach(k => {
        if (k.numer > max) {
            max = k.numer;
        }
    })

    if (req.body.numer > max) {
        req.body.numer = max + 1;
    } else {
        klasy.find({}).forEach(k => {
            if (req.body.numer <= k.numer) {
                k.numer++;
            }
        });
    }
    return res.json(klasy.insert(req.body));
});

router.delete('/:id', (req, res) => {
    let klasy = DB.getCollection('Klasy');
    let konie = DB.getCollection('Konie').find({});
    let flaga = true;



    konie.forEach(kon => {
        if (kon.klasa === req.params.id * 1) {
            flaga = false;
        }
    })


    let klasa = klasy.findOne({
        "$loki": req.params.id * 1
    });


    if (flaga || klasa.oceniono === 1 || klasa.oceniono === 0) {
        klasy.find({}).forEach(k => {
            if (k.numer > klasa.numer) {
                k.numer--;
            }
        })

        if (klasa) {
            klasy.remove(klasa);
            return res.send("Usunieto pomyslnie");
        } else {
            return res.send("Nie ma takiej klasy");
        }
    } else {
        return res.json({
            error: "Nie można usunąć!!!"
        });
    }

});

router.put('/', (req, res) => {
    let klasy = DB.getCollection('Klasy');
    let [stary] = DB.getCollection('Klasy').find({
        '$loki': req.body['$loki']
    });
    if (stary.oceniono === 1) {
        return res.json({
            error: "Ta klasa jest juz oceniona"
        });
    }

    if (req.body.oceniono === 0) {
        let aktywne = DB.getCollection('Klasy').findOne({
            "oceniono": 0
        });
        if (aktywne) {
            return res.json({
                error: "Inna klasa jest otwarta"
            });
        } else {
            io.emit("Aktualna", req.body);
        }
    }

    if (req.body.oceniono === 1 && stary.oceniono === 0) {
        io.emit("ZamknijKlase");
    }

    let max = 0;
    klasy.find({}).forEach(k => {
        if (k.numer > max) {
            max = k.numer;
        }
    })

    let przed = stary.numer;
    let po = req.body.numer;



    let obiekt = req.body;

    if (po > max) {
        obiekt.numer = max;
        klasy.find({}).forEach(e => {
            if (e.numer > przed) {
                e.numer--;
            }
        })
        klasy.update(obiekt);
    } else if (przed === po) {
        klasy.update(req.body);
    } else if (przed > po) {

        DB.getCollection('Klasy').find({}).forEach(k => {
            if (po <= k.numer && przed > k.numer) {
                k.numer++;
                klasy.update(k);
            }
        });

        klasy.update(req.body);
    } else if (po > przed) {
        DB.getCollection('Klasy').find({}).forEach(k => {
            if (po >= k.numer && przed < k.numer) {
                k.numer--;
            }
        });
        klasy.update(req.body);
    }
    return res.json(req.body);

});


module.exports = router;