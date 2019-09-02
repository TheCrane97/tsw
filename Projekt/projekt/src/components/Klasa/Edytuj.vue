<template>
    <div id="klasa">
        <h1>Edytuj Klase</h1>
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
                        <input type="number" min="1" max="200" step="1" v-model="kopia.numer">
                    </th>
                    <th>
                        <input id="input-kategoria" v-model="kopia['kat']" type="text">
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
                <button @click="edytuj" v-if="!err1 && !err2 && !err3">Edytuj</button>
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
        name: "EdytujKlasa",
        components: {
            Multiselect
        },
        data: function () {
            return {
                kopia: {
                    numer: "",
                    kat: "",
                    komisja: []
                },
                klasa: null,

                sedziowie: null,
                wybor: [],
                opcje: []
            };
        },
        props: {
            klasaId: { default: -1, type: Number }
        },
        computed: {
            err1 () {
                if (this.kopia.numer >= 1) {
                    return false;
                } else {
                    return true;
                }
            },
            err2 () {
                if (this.kopia.kat.length >= 3) {
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
            edytuj () {
                this.kopia.komisja.length = 0;
                this.wybor.forEach(element => {
                    this.kopia.komisja.push(element["$loki"]);
                });
                this.$store.dispatch("edytuj", {
                    sciezka: "admin/klasy",
                    obiekt: this.kopia,
                    tabela: "Klasy"
                });
                this.$emit("zamknijEdytuj");
            },
            zamknij () {
                this.$emit("zamknijEdytuj");
            }
        },

        created () {
            if (this.klasaId >= 0) {
                this.opcje = this.$store.state.Sedziowie;
                this.klasa = this.$store.getters.pobierzKlase(this.klasaId);
                this.kopia = JSON.parse(JSON.stringify(this.klasa));
                console.log(this.kopia);
                this.wybor = this.kopia.sedziowie;
            }
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
