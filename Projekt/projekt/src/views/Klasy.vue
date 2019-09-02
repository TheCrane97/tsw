<template>
    <div>
        <Dodaj v-if="dodajIf" @zamknijDodaj="zamknijD"/>
        <Edytuj :key="klasaId" v-if="edytujIf" @zamknijEdytuj="zamknijE" :klasaId="klasaId"/>
        <Komunikat
            v-if="komunikatU"
            komunikat="Czy napewno chcesz usunąć Klase"
            @tak="usun"
            @nie="zamknijK"
        />
        <div v-if="!edytujIf && !dodajIf">
            <div>
                <h1>
                    <input type="text" v-model="szukaj" placeholder="Wyszukaj Klase">
                </h1>
            </div>
            <div>
                <h1>
                    <button @click="dodaj">Dodaj Nową Klase</button>
                </h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Numer</th>
                        <th>Kategoria</th>
                        <th>Komisja</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="klasa in lista" v-bind:key="klasa['$loki']">
                        <td>{{klasa.numer}}</td>
                        <td>{{klasa.kat}}</td>
                        <td>
                            <tr>
                                <td v-for="s in klasa.sedziowie" v-bind:key="s['kat']">{{s.sedzia}}</td>
                            </tr>
                        </td>
                        <td>
                            <button @click="edytuj(klasa['$loki'])">Edytuj</button>
                            <button @click="komunikat(klasa['$loki'])">Usuń</button>
                            <button @click="oceniaj(klasa['$loki'])">Oceniaj</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Dodaj from "../components/Klasa/Dodaj";
    import Edytuj from "../components/Klasa/Edytuj";
    import Komunikat from "../components/Komunikaty/KomunikatTN";
    export default {
        name: "Klasy",

        data: function () {
            return {
                klasy: {},
                sedziowie: {},
                szukaj: "",
                dodajIf: false,
                edytujIf: false,
                klasaId: null,
                komunikatU: false,
                usuwanieID: 0
            };
        },
        components: {
            Dodaj,
            Edytuj,
            Komunikat
        },
        methods: {
            pobierz: function () {
                this.klasy = this.$store.getters.pobierzKlasy;
                this.sedziowie = this.$store.getters.pobierzSedziowie;
                this.klasy.forEach(e => {
                    e.sedziowie = [];
                    let s = e;
                    e.komisja.forEach(f => {
                        this.sedziowie.forEach(b => {
                            if (f === b["$loki"]) {
                                s.sedziowie.push(b);
                            }
                        });
                    });
                });
            },

            oceniaj (id) {
                let k = JSON.parse(JSON.stringify(this.$store.getters.pobierzKlase(id)));
                if (k.oceniono === 0) {
                    this.$router.push("/admin/oceniaj/" + k.$loki);
                } else {
                    k.oceniono = 0;

                    this.$store.dispatch("edytuj", {
                        sciezka: "admin/klasy",
                        obiekt: k,
                        tabela: "Klasy",
                        fun: this
                    });
                }
            },

            zamknijD () {
                this.dodajIf = false;
            },
            zamknijE () {
                this.edytujIf = false;
            },
            zamknijK () {
                this.komunikatU = false;
            },
            komunikat (id) {
                this.usuwanieID = id;
                this.komunikatU = true;
            },
            edytuj (id) {
                console.log(id);
                this.klasaId = id;
                this.edytujIf = true;
            },
            dodaj () {
                this.dodajIf = true;
            },

            usun () {
                this.komunikatU = false;
                this.$store.dispatch("usun", {
                    sciezka: "admin/klasy",
                    obiekt: this.$store.getters.pobierzKlase(this.usuwanieID),
                    tabela: "Klasy",
                    fun: this
                });
            }
        },

        computed: {
            lista () {
                this.pobierz();
                let a = this.szukaj.toLowerCase();
                return this.klasy.filter(function (e) {
                    return e.kat.toLowerCase().includes(a);
                });
            }
        }
    };
</script>

<style lang="less" scoped>
</style>
