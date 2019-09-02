const express = require('express');
const router = express.Router();
const baza = require('../baza');
const DB = baza.db;

router.get('/', (req, res) => {
    return res.json(DB.getCollection('Sedziowie').find());
});

router.delete('/:id', (req, res) => {
    let sedziowie = DB.getCollection('Sedziowie');
    let sedzia = sedziowie.findOne({
        "$loki": req.params.id * 1
    });
    if (!sedzia) {
        return res.send("Nie ma takiego sedziego");
    }

    let klasy = DB.getCollection('Klasy').find({
        "komisja": {
            "$contains": req.params.id * 1
        }
    });

    if (klasy.length === 0) {
        sedziowie.remove(sedzia);
        return res.send("Usunieto pomyslnie");
    } else {
        return res.json({
            error: "Nie można usunąć powiązanie z klasą"
        });
    }
});

router.post('/', (req, res) => {
    if (req.body.sedzia && req.body.kraj) {
        let sedziowie = DB.getCollection('Sedziowie');
        let nowy = sedziowie.insert(req.body);
        return res.json(nowy);
    } else {
        return res.send("Nie można dodać");
    }
});

router.put('/', (req, res) => {
    DB.getCollection('Sedziowie').update(req.body);
    return res.json(req.body);

});

module.exports = router;