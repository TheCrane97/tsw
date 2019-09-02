let pobierzSedziowie = (state) => {
    return state.Sedziowie;
};
let pobierzKlasy = (state) => {
    return state.Klasy;
};
let pobierzKonie = (state) => {
    return state.Konie;
};
let pobierzSedziego = (state) => (id) => {
    let [a] = state.Sedziowie.filter(e => {
        if (e["$loki"] === id) {
            return true;
        } else {
            return false;
        }
    });
    return a;
};
let pobierzKlase = (state) => (id) => {
    let [a] = state.Klasy.filter(e => {
        if (e["$loki"] === id) {
            return true;
        } else {
            return false;
        }
    });
    return a;
};
let pobierzKonia = (state) => (id) => {
    return state.Konie.find(kon => kon["$loki"] === id);
};

let isLoggedIn = state => !!state.token;

let authStatus = state => state.status;

export default {
    pobierzKlase,
    pobierzKonie,
    pobierzKonia,
    pobierzSedziego,
    pobierzSedziowie,
    pobierzKlasy,
    isLoggedIn,
    authStatus
};
