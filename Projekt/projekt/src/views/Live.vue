<template>
    <div>
        <h1>Panel Kibica</h1>
        <div class="panel">
            <div class="klasa" v-for="k in klasyOcenione" :key="k.$loki">
                <button class="przycisk" @click="pokaz(k.$loki)">{{k.numer}}. {{k.kat}} - Szczegóły</button>
                <div v-if="k.$loki==klasaID">
                    <Oceniona :historyczna="true" :key="klasaID" v-if="klasaID" :klasaId="klasaID"/>
                </div>
            </div>
        </div>
        <h1>Live</h1>
        <div>
            <h1 v-if="aktualna">{{aktualna.kat}}</h1>
            <Oceniona v-if="aktualna" :key="aktualna.$loki" :klasaId="aktualna.$loki"/>
        </div>
    </div>
</template>

<script>
    import Oceniona from "../components/Oceny/Oceniona";
    export default {
        name: "Live",
        components: {
            Oceniona
        },
        data: function () {
            return {
                klasyOcenione: [],
                klasaID: null,
                aktualna: null
            };
        },
        methods: {
            pokaz (id) {
                this.klasaID = id;
            }
        },

        sockets: {
            MaszOcenioneKlasy (dane) {
                this.klasyOcenione = dane;
            },
            Aktualna (dane) {
                this.aktualna = dane;
            },
            ZamknijKlase () {
                this.aktualna.oceniono = 1;
                this.klasyOcenione.push(this.aktualna);
                this.aktualna = null;
            },
            Wyzeruj () {
                this.klasyOcenione = [];
                this.klasaID = null;
                this.aktualna = null;
            }
        }
    };
</script>

<style lang="less">
.przycisk{
    margin:auto;
    margin-top: 10px;
    display:block;
    width:400px;
    height: 50px;
    font-size:17px;
    border-radius: 3px;
    color: black;
    background-color:rgb(152, 67, 231);
}
.przycisk:hover{
    color: red;
    cursor: pointer;
}
</style>
