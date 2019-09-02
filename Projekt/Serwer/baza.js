const loki = require('lokijs');

let baza = new loki('konie.db', {
    autoload: true,
    autosave: true,
    autosaveInterval: 5000,
    autoloadCallback: loadBaza
});

function loadBaza() {

    if (!baza.getCollection('Konie'))
        baza.addCollection('Konie');

    if (!baza.getCollection('Sedziowe'))
        baza.addCollection('Sedziowie');

    if (!baza.getCollection('Klasy'))
        baza.addCollection('Klasy');

    if (!baza.getCollection('Uzytkownicy'))
        baza.addCollection("Uzytkownicy");

    if (!baza.getCollection('Uzytkownicy').findOne({})) {
        baza.getCollection('Uzytkownicy').insert({
            id: 1,
            login: "admin",
            haslo: "admin"
        })
    };


};

function selectByEmail(login, callback) {
    //console.log(login);
    const user =  baza.getCollection('Uzytkownicy').findOne({"login": login});
    callback(user);
}

module.exports = {
 db: baza,
 selectByLogin: selectByEmail 
};