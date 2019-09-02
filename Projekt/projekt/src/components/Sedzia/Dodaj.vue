<template>
    <div id="dodawanie">
        <h1>Dodaj Sedziego</h1>
        <table>
            <thead>
                <tr>
                    <th>
                        Sedzia
                    </th>
                    <th>
                        Kraj
                    </th>
                </tr>
                <tr>
                    <th>
                        <input v-model="sedzia['sedzia']" class="input" type="text">
                    </th>
                    <th>
                        <input v-model="sedzia['kraj']" class="input" type="text">
                    </th>
                </tr>
                <tr>
                    <th>
                        <span v-if="pole1" style="color:red">Pole Wymagane minimum 2 litery</span>
                    </th>
                    <th>
                        <span v-if="pole2" style="color:red">Pole Wymagane minimum 2 litery</span>
                    </th>
                </tr>
            </thead>
        </table>
        <div>
            <button v-if="!pole1 && !pole2" v-on:click="dodaj">Dodaj</button>
            <button @click="zamknij" style="background-color:red">Cofnij</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DodajSedzia",

        data: function () {
            return {
                sedzia: {
                    sedzia: "",
                    kraj: ""
                }
            };
        },
        methods: {
            dodaj () {
                this.$store.dispatch("dodaj", {
                    sciezka: "admin/sedziowie",
                    obiekt: this.sedzia,
                    tabela: "Sedziowie"
                });
                this.$emit("zamknijDodaj");
            },
            zamknij () {
                this.$emit("zamknijDodaj");
            }
        },

        computed: {
            pole1 () {
                if (this.sedzia.sedzia.length < 2) {
                    return true;
                } else {
                    return false;
                }
            },
            pole2 () {
                if (this.sedzia.kraj.length < 2) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
</script>

<style scoped lang="less">
table {
    width:600px;
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
