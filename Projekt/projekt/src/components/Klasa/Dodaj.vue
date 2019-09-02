<template>
    <div id="klasa">
        <h1>Dodaj Klase</h1>
        <table>
            <thead>
                <tr>
                    <th>
                        Numer
                    </th>
                    <th>
                        Kategoria
                    </th>
                    <th>
                        Komisja
                    </th>
                </tr>
                <tr>
                    <th>
                        <input type="number" min="1" max="200" step="1" v-model="klasa.numer">
                    </th>
                    <th>
                        <input id="input-kategoria" v-model="klasa['kat']" type="text">
                    </th>
                    <th>
                        <multiselect
                            v-model="wybor"
                            placeholder="Wyszukaj sędziów"
                            label="sedzia"
                            track-by="$loki"
                            :options="opcje"
                            :multiple="true"
                        ></multiselect>
                    </th>
                </tr>
                <tr>
                    <th>
                        <span v-if="err1">Pole Wymagane Liczba</span>
                    </th>
                    <th>
                        <span v-if="err2">Pole Wymagane Minimum 3 znaki</span>
                    </th>
                    <th>
                        <span v-if="err3">Pole Wymagane Minimum 1 sedzia</span>
                    </th>
                </tr>
            </thead>
        </table>
        <div>
            <div>
                <button @click="dodaj" v-if="!err1 && !err2 && !err3">Dodaj</button>
            </div>
            <div>
                <button @click="zamknij" style="background-color:red">Cofnij</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Multiselect from "vue-multiselect";
    export default {
        name: "DodajKlasa",
        components: {
            Multiselect
        },
        data: function () {
            return {
                klasa: {
                    numer: null,
                    kat: "",
                    komisja: []
                },
                sedziowie: null,
                wybor: [],
                opcje: []
            };
        },

        computed: {
            err1 () {
                if (this.klasa.numer >= 1) {
                    return false;
                } else {
                    return true;
                }
            },
            err2 () {
                if (this.klasa.kat.length >= 3) {
                    return false;
                } else {
                    return true;
                }
            },
            err3 () {
                if (this.wybor.length >= 1) {
                    return false;
                } else {
                    return true;
                }
            }
        },

        methods: {
            pobierz () {
                this.opcje = this.$store.state.Sedziowie;
            },
            dodaj () {
                this.wybor.forEach(element => {
                    this.klasa.komisja.push(element["$loki"]);
                });
                this.klasa.numer = this.klasa.numer * 1;
                this.$store.dispatch("dodaj", {
                    sciezka: "admin/klasy",
                    obiekt: this.klasa,
                    tabela: "Klasy"
                });
                this.$emit("zamknijDodaj");
            },
            zamknij () {
                this.$emit("zamknijDodaj");
            }
        },
        created () {
            this.pobierz();
        }
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="less" scoped>
table {
    width: 900px;
}
button{
    margin:auto;
    margin-top: 15px;
    display:block;
    font-size:18px;
    border: none;
    color: black;
    border-radius: 4px;
    text-decoration: none;
    background-color:green;
}
button:hover{
    cursor: pointer;
    color:black;
}
</style>
