<template>
    <div>
        <Dodaj v-if="dodajIf" @zamknijDodaj="zamknijD"/>
        <Edytuj :key="edytujId" :konId="edytujId" v-if="edytujIf" @zamknijEdytuj="zamknijE"/>
        <Komunikat
            v-if="komunikatU"
            komunikat="Czy napewno chcesz usunąć Konia"
            @tak="usun"
            @nie="zamknijK"
        />
        <div v-if="!dodajIf && !edytujIf">
            <div>
                <h1>
                    <input type="text" v-model="szukaj" placeholder="Wyszukaj Konia">
                </h1>
            </div>
            <div>
                <h1>
                    <button @click="dodaj">Dodaj Nowego Konia</button>
                </h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Numer</th>
                        <th>Nazwa</th>
                        <th>Klasa</th>
                        <th>Kraj</th>
                        <th>Rocznik</th>
                        <th>Maść</th>
                        <th>Płeć</th>
                        <th>Hodowca</th>
                        <th>Właściciel</th>
                        <th>Rodowód</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="k in lista" v-bind:key="k['$loki']">
                        <td>{{k.numer}}</td>
                        <td>{{k.nazwa}}</td>
                        <td>{{wyswietlKlase(k.klasa)}}</td>
                        <td>{{k.kraj}}</td>
                        <td>{{k.rocznik}}</td>
                        <td>{{k.masc}}</td>
                        <td>{{k.plec}}</td>
                        <td>
                            <ul>
                                <li>{{k.hodowca.nazwa}}</li>
                                <li>kraj:{{k.hodowca.kraj}}</li>
                            </ul>
                        </td>
                        <td>
                            <ul>
                                <li>{{k.wlasciciel.nazwa}}</li>
                                <li>kraj:{{k.wlasciciel.kraj}}</li>
                            </ul>
                        </td>
                        <td>
                            <tr>
                                <td>Ojciec: NAZWA:{{k.rodowod.o.nazwa}} KRAJ:{{k.rodowod.o.kraj}}</td>
                                <td>Matka: NAZWA:{{k.rodowod.m.nazwa}} KRAJ:{{k.rodowod.m.kraj}}</td>
                                <td>Ojciec-Matka: NAZWA:{{k.rodowod.om.nazwa}} KRAJ:{{k.rodowod.om.kraj}}</td>
                            </tr>
                        </td>
                        <td id="przycisk">
                            <button @click="edytuj(k.$loki)">Edytuj</button>
                            <button @click="komunikatUsun(k['$loki'])">Usuń</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Komunikat from "../components/Komunikaty/KomunikatTN";
    import Dodaj from "../components/Kon/Dodaj";
    import Edytuj from "../components/Kon/Edytuj";
    export default {
        data: function () {
            return {
                konie: [],
                szukaj: "",
                pokaz: false,
                klasa: null,
                komunikatU: false,
                usuwanieID: 0,
                dodajIf: false,
                edytujIf: false,
                edytujId: null
            };
        },
        components: {
            Komunikat,
            Dodaj,
            Edytuj
        },
        methods: {
            ukryj () {
                if (this.pokaz) {
                    this.pokaz = !this.pokaz;
                } else {
                    this.pokaz = !this.pokaz;
                }
            },
            zamknijK () {
                this.komunikatU = false;
            },
            zamknijD () {
                this.dodajIf = false;
            },
            zamknijE () {
                this.edytujIf = false;
            },
            dodaj () {
                this.dodajIf = true;
            },
            edytuj (id) {
                this.edytujId = id;
                this.edytujIf = true;
            },
            wyswietlKlase (id) {
                let a = this.$store.getters.pobierzKlase(id);
                return a.numer + "--" + a.kat;
            },
            usun () {
                this.komunikatU = false;
                this.$store.dispatch("usun", {
                    sciezka: "admin/konie",
                    obiekt: this.$store.getters.pobierzKonia(this.usuwanieID),
                    tabela: "Konie"
                });
            },
            komunikatUsun (id) {
                this.komunikatU = true;
                this.usuwanieID = id;
            }
        },
        computed: {
            lista () {
                let that = this;
                return this.$store.getters.pobierzKonie.filter(function (e) {
                    let b = that.szukaj.toLowerCase();
                    if (e.nazwa.toLowerCase().includes(b)) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }
        }
    };
</script>

<style lang="less" scoped>
</style>
