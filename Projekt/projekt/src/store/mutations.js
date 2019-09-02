let ladowanieKoni = (state, konie) => {
    state.Konie = konie;
};

let ladowanieSedziow = (state, sedziowie) => {
    state.Sedziowie = sedziowie;
};

let ladowanieKlas = (state, klasy) => {
    state.Klasy = klasy;
};

let dodaj = (state, a) => {
    if (a.tabela === "Klasy" || a.tabela === "Konie") {
        state[a.tabela].forEach(e => {
            if (e.numer >= a.obiekt.numer) {
                e.numer++;
            }
        });
    }

    state[`${a.tabela}`].push(a.obiekt);

    if (a.tabela === "Klasy" || a.tabela === "Konie") {
        state[a.tabela].sort((a, b) => {
            if (a.numer > b.numer) {
                return 1;
            } else {
                return -1;
            }
        });
    }
};

let usun = (state, a) => {
    if (a.tabela === "Sedziowie") {
        state.Sedziowie = state.Sedziowie.filter(e => {
            if (e["$loki"] === a.obiekt["$loki"]) {
                return false;
            } else {
                return true;
            }
        });
    }
    if (a.tabela === "Klasy" || a.tabela === "Konie") {
        state[a.tabela] = state[a.tabela].filter(e => {
            if (e["$loki"] === a.obiekt["$loki"]) {
                return false;
            } else {
                return true;
            }
        });
        state[a.tabela].forEach(e => {
            if (e.numer > a.obiekt.numer) {
                e.numer--;
            }
        });
    }
};

let edytuj = (state, a) => {
    if (a.tabela === "Sedziowie") {
        let [sedzia] = state[`${a.tabela}`].filter(e => {
            return e["$loki"] === a.obiekt["$loki"];
        });

        sedzia.sedzia = a.obiekt.sedzia;
        sedzia.kraj = a.obiekt.kraj;
    }
    if (a.tabela === "Klasy" || a.tabela === "Konie") {
        let [obj] = state[`${a.tabela}`].filter(e => {
            return e["$loki"] === a.obiekt["$loki"];
        });

        let max = 0;

        state[a.tabela].forEach(k => {
            if (k.numer > max) {
                max = k.numer;
            }
        });

        let przed = obj.numer;
        let po = a.obiekt.numer;

        let obiekt = a.obiekt;

        if (po > max) {
            obiekt.numer = max;
            state[a.tabela].forEach(e => {
                if (e.numer > przed) {
                    e.numer--;
                }
            });
        } else if (przed === po) {

        } else if (przed > po) {
            state[a.tabela].forEach(k => {
                if (po <= k.numer && przed > k.numer) {
                    k.numer++;
                }
            });
        } else if (po > przed) {
            state[a.tabela].forEach(k => {
                if (po >= k.numer && przed < k.numer) {
                    k.numer--;
                }
            });
        }

        if (a.tabela === "Klasy") {
            obj.numer = a.obiekt.numer;
            obj.kat = a.obiekt.kat;
            obj.komisja = a.obiekt.komisja;
        }

        if (a.tabela === "Konie") {
            obj.numer = a.obiekt.numer;
            obj.klasa = a.obiekt.klasa;
            obj.nazwa = a.obiekt.nazwa;
            obj.kraj = a.obiekt.kraj;
            obj.rocznik = a.obiekt.rocznik;
            obj.masc = a.obiekt.masc;
            obj.plec = a.obiekt.plec;
            obj.hodowca = a.obiekt.hodowca;
            obj.wlasciciel = a.obiekt.wlasciciel;
            obj.rodowod = a.obiekt.rodowod;
            obj.wynik = a.obiekt.wynik;
            obj.oceniono = a.obiekt.oceniono;
        }

        state[a.tabela].sort((a, b) => {
            if (a.numer > b.numer) {
                return 1;
            } else {
                return -1;
            }
        });
    }
};

let authRequest = (state) => {
    state.status = "loading";
};
let authSuccess = (state, token, user) => {
    state.status = "success";
    state.token = token;
    state.user = user;
};
let authError = (state) => {
    state.status = "error";
};
let logout = (state) => {
    state.status = "";
    state.token = "";
};

export default {
    ladowanieKlas,
    ladowanieKoni,
    ladowanieSedziow,
    dodaj,
    usun,
    edytuj,
    authError,
    authRequest,
    authSuccess,
    logout
};
