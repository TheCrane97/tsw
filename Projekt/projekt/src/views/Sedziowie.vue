<template>
    <div id="lista">
        <Dodaj v-if="dodajIf" @zamknijDodaj="zamknijD"/>
        <Edytuj :key="sedziaId" v-if="edytujIf" @zamknijEdytuj="zamknijE" :sedziaId="sedziaId"/>
        <Komunikat
            v-if="komunikatU"
            komunikat="Czy napewno chcesz usunąć Sędziego"
            @tak="usun"
            @nie="zamknijK"
        />
        <div v-if="!dodajIf && !edytujIf">
            <div>
                <h1>
                    <input type="text" v-model="szukaj" placeholder="Wyszukaj Sedziego">
                </h1>
            </div>
            <div>
                <h1>
                    <button @click="dodaj">Dodaj Nowego Sędziego</button>
                </h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sedzia</th>
                        <th>Kraj</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="sedzia in lista" v-bind:key="sedzia['$loki']">
                        <td>{{sedzia.sedzia}}</td>
                        <td>{{sedzia.kraj}}</td>
                        <td>
                            <button @click="edytuj(sedzia['$loki'])">Edytuj</button>
                            <button @click="komunikat(sedzia['$loki'])">Usuń</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import Dodaj from "../components/Sedzia/Dodaj";
    import Edytuj from "../components/Sedzia/Edytuj";
    import Komunikat from "../components/Komunikaty/KomunikatTN";

    export default {
        name: "Sedziowie",
        components: {
            Dodaj,
            Edytuj,
            Komunikat
        },
        data: function () {
            return {
                sedziowie: {},
                szukaj: "",
                dodajIf: false,
                edytujIf: false,
                komunikatU: false,
                sedziaId: -1,
                funy: null,
                usuwanieID: 0
            };
        },

        methods: {
            pobierz: function () {
                this.sedziowie = this.$store.getters.pobierzSedziowie;
            },
            dodaj: function () {
                this.zamknijE();
                this.dodajIf = true;
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
            usun () {
                this.zamknijK();
                this.$store.dispatch("usun", {
                    sciezka: "admin/sedziowie",
                    obiekt: this.$store.getters.pobierzSedziego(this.usuwanieID),
                    tabela: "Sedziowie",
                    fun: this
                });
            },
            komunikat (id) {
                this.dodajIf = false;
                this.edytujIf = false;
                this.usuwanieID = id;
                this.komunikatU = true;
            },
            edytuj (id) {
                this.zamknijD();
                this.sedziaId = id;
                this.edytujIf = true;
            }
        },

        computed: {
            lista () {
                this.pobierz();
                let a = this.szukaj.toLowerCase();
                return this.sedziowie.filter(function (e) {
                    let b = a;
                    return e.sedzia.toLowerCase().includes(b);
                });
            }
        }
    };
</script>

<style lang="less" scoped>
</style>
