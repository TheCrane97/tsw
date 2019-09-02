const suma = (kon) => {
    let wynik = 0;
    kon.wynik.noty.forEach(e => {

        for (pole in e) {
            wynik = wynik + e[pole];
        }
    });
    return wynik;
}

const sumaTyp = (kon) => {
    let wynik = 0;
    kon.wynik.noty.forEach(e => {
        wynik = wynik + e.typ;
    });
    return wynik;
}

const sumaRuch = (kon) => {
    let wynik = 0;
    kon.wynik.noty.forEach(e => {
        wynik = wynik + e.ruch;
    });
    return wynik;
}

const sumaGlowa = (kon) => {
    let wynik = 0;
    kon.wynik.noty.forEach(e => {
        wynik = wynik + e.glowa;
    });
    return wynik;
}

const sumaKloda = (kon) => {
    let wynik = 0;
    kon.wynik.noty.forEach(e => {
        wynik = wynik + e.kloda;
    });
    return wynik;
}

const sumaNogi = (kon) => {
    let wynik = 0;
    kon.wynik.noty.forEach(e => {
        wynik = wynik + e.nogi;
    });
    return wynik;
}


module.exports = {
    suma: suma,
    sumaTyp: sumaTyp,
    sumaRuch: sumaRuch,
    sumaGlowa: sumaGlowa,
    sumaKloda: sumaKloda,
    sumaNogi: sumaNogi
}