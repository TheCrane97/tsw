const express = require('express');
const router = express.Router();
const baza = require('../baza');
const DB = baza.db;
const io = require('../socketIO');
const sum = require('../sumowanie')

router.get('/', (req, res) => {
    res.json(DB.getCollection('Konie').chain().simplesort('numer', false).data());
});

router.post('/', (req, res) => {
    let konie = DB.getCollection('Konie');
    let max = 0;

    konie.find({}).forEach(k => {
        if (k.numer > max) {
            max = k.numer;
        }
    })

    if (req.body.numer > max) {
        req.body.numer = max + 1;
    } else {
        konie.find({}).forEach(k => {
            if (req.body.numer <= k.numer) {
                k.numer++;
            }
        });
    }
    return res.json(konie.insert(req.body));
});

router.delete('/:id', (req, res) => {
    let konie = DB.getCollection('Konie');
    let kon = konie.findOne({
        "$loki": req.params.id * 1
    });

    let klasa = DB.getCollection('Klasy').find({
        "$loki": kon.klasa
    })

    if (klasa.oceniono === 0 || klasa.oceniono === 1) {
        res.json({
            error: "Nie można usunąć klasy"
        })
    }

    if (kon) {
        konie.find({}).forEach(k => {
            if (k.numer > kon.numer) {
                k.numer--;
                konie.update(k);
            }
        });
        konie.remove(kon);
        return res.send("Usunieto pomyslnie");
    } else {
        return res.send("Nie ma takiego Konia");
    }
});

router.put('/', (req, res) => {
    let konie = DB.getCollection('Konie');
    let [stary] = DB.getCollection('Konie').find({
        '$loki': req.body['$loki']
    });
    let max = 0;

    let klasa = DB.getCollection('Klasy').findOne({
        "$loki": stary.klasa
    })

    if (klasa.oceniono === 1) {
        res.json({
            error: "Nie można edytować klasy"
        })
    }

    konie.find({}).forEach(k => {
        if (k.numer > max) {
            max = k.numer;
        }
    })

    let przed = stary.numer;
    let po = req.body.numer;

    let obiekt = req.body;

    if (po > max) {
        obiekt.numer = max;
        konie.find({}).forEach(e => {
            if (e.numer > przed) {
                e.numer--;
            }
        })
        konie.update(obiekt);
    } else if (przed === po) {
        konie.update(req.body);
    } else if (przed > po) {

        DB.getCollection('Konie').find({}).forEach(k => {
            if (po <= k.numer && przed > k.numer) {
                k.numer++;
                konie.update(k);
            }
        });

        konie.update(req.body);
    } else if (po > przed) {
        DB.getCollection('Konie').find({}).forEach(k => {
            if (po >= k.numer && przed < k.numer) {
                k.numer--;
            }
        });
        konie.update(req.body);
    }

    if (klasa.oceniono === 0 && req.body.oceniono) {

        let konie = DB.getCollection("Konie").find({
            "klasa": req.body.klasa
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

        io.emit('MaszAktualne', ocenione);
    }


    return res.json(req.body);
});

module.exports = router;