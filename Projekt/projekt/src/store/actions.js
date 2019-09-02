import axios from "axios";
import router from "../router";
let pobierzDane = ({
    commit
}) => {
    axios
        .get(`http://${window.location.hostname}:4000/admin/sedziowie`)
        .then(r => r.data)
        .then(sedziowie => {
            commit("ladowanieSedziow", sedziowie);
        })
        .catch(err => {
            console.log(err);
        });
    axios
        .get(`http://${window.location.hostname}:4000/admin/klasy`)
        .then(r => r.data)
        .then(klasy => {
            commit("ladowanieKlas", klasy);
        })
        .catch(err => {
            console.log(err);
        });
    axios
        .get(`http://${window.location.hostname}:4000/admin/konie`)
        .then(r => r.data)
        .then(konie => {
            commit("ladowanieKoni", konie);
        })
        .catch(err => {
            console.log(err);
        });
};

let edytuj = ({
    commit
}, a) => {
    axios
        .put(`http://${window.location.hostname}:4000/${a.sciezka}`, a.obiekt)
        .then(response => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                a.obiekt = response.data;
                commit("edytuj", a);
                if (a.obiekt.oceniono === 0) {
                    router.push("/admin/oceniaj/" + a.obiekt.$loki);
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
};

let dodaj = ({
    commit
}, a) => {
    axios
        .post(`http://${window.location.hostname}:4000/${a.sciezka}`, a.obiekt)
        .then(response => {
            a.obiekt = response.data;
            commit("dodaj", a);
        })
        .catch(err => {
            console.log(err);
        });
};

let usun = ({
    commit
}, a) => {
    axios
        .delete(`http://${window.location.hostname}:4000/${a.sciezka}/` + a.obiekt["$loki"])
        .then(response => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                commit("usun", a);
            }
        })
        .catch(err => {
            console.log(err);
        });
};

let generuj = ({
    commit
}, a) => {
    axios
        .get(`http://${window.location.hostname}:4000/admin/generuj`)
        .then(() => {
            a();
        })
        .catch(err => {
            console.log(err);
        });
};

let login = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        commit("authRequest");
        axios({ url: `http://${window.location.hostname}:4000/login`, data: user, method: "POST" })
            .then(resp => {
                const token = resp.data.token;
                const user = resp.data.user;
                localStorage.setItem("token", token);
                axios.defaults.headers.common["Authorization"] = token;
                commit("authSuccess", token, user);
                resolve(resp);
            })
            .catch(err => {
                commit("authError");
                localStorage.removeItem("token");
                reject(err);
            });
    });
};

let logout = ({ commit }) => {
    return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
    });
};

export default {
    pobierzDane,
    edytuj,
    dodaj,
    usun,
    generuj,
    login,
    logout
};
