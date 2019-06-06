/* eslint-disable */
<template>
    <div class="dodajkonia">
        <h1>Dodaj Konia</h1>
        <table>
            <thead>
                <tr>
                    <th>Numer: <input v-model="numer" type="text"></th>
                    <th>Klasa: <input v-model="klasa" type="text"></th>
                    <th>Nazwa: <input v-model="nazwa" type="text"></th>
                    <th>Kraj: <input v-model="kraj" type="text"></th>
                    <th>Rocznik: <input v-model="rocznik" type="number"></th>
                    <th>Masc: <input v-model="masc" type="text"></th>
                    <th>Plec: <input v-model="plec" type="text"></th>
                    <th><button v-on:click="addHorse()">Dodaj</button></th>
                </tr>
                <tr>
                    <th>Hodowca(nazwa-kraj):<input v-model="hnazwa" type="text"> <input v-model="hkraj" type="text"></th>
                    <th>Wlasciciel(nazwa-kraj): <input v-model="wnazwa" type="text"> <input v-model="wkraj" type="text"></th>
                    <th>Rodowod:</th>
                    <th>Ojciec(nazwa-kraj):<input v-model="onazwa" type="text"><input v-model="okraj" type="text"></th>
                    <th>Matka(nazwa-kraj):<input v-model="mnazwa" type="text"><input v-model="mkraj" type="text"></th>
                    <th>OjciecMatka(nazwa-kraj):<input v-model="omnazwa" type="text"><input v-model="omkraj" type="text"></th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    export default {
        name: "dodajkonia",
        props: {
            msg: String
        },
        data: function () {
            return {
                data: null,
                numer: null,
                klasa: null,
                nazwa: null,
                kraj: null,
                rocznik: null,
                masc: null,
                plec: null,
                hnazwa: null,
                hkraj: null,
                wnazwa: null,
                wkraj: null,
                onazwa: null,
                okraj: null,
                mnazwa: null,
                mkraj: null,
                omnazwa: null,
                omkraj: null
            };
        },
        methods: {
            addHorse () {
                var data = {
                    "numer": this.numer,
                    "klasa": this.klasa,
                    "nazwa": this.nazwa,
                    "kraj": this.kraj,
                    "rocznik": this.rocznik,
                    "masc": this.masc,
                    "plec": this.plec,
                    "hodowca": {
                        "nazwa": this.hnazwa,
                        "kraj": this.hkraj
                    },
                    "wlasciciel": {
                        "nazwa": this.wnazwa,
                        "kraj": this.wkraj
                    },
                    "rodowod": {
                        "o": {
                            "nazwa": this.onazwa,
                            "kraj": this.okraj
                        },
                        "m": {
                            "nazwa": this.mnazwa,
                            "kraj": this.mkraj
                        },
                        "om": {
                            "nazwa": this.omnazwa,
                            "kraj": this.omkraj
                        }
                    }
                };
                this.$http.post("http://localhost:3000/konie/", data)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {
                        this.$router.push("konie");
                    });
            }
        },

        mounted () {
        }
    };
</script>
<style scoped lang="less">
h1{
    text-align:center;
}
table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: auto;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}
</style>
