<template>
    <div>
        <table style="margin-top:5px">
            <thead>
                <tr>
                    <th>Numer</th>
                    <th>Nazwa</th>
                    <th>Typ</th>
                    <th>Ruch</th>
                    <th>Głowa</th>
                    <th>Kłoda</th>
                    <th>Nogi</th>
                    <th>Suma</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="k in listaKoni" :key="k.$loki">
                    <td v-if="k.oceniono">{{k.numer}}</td><td v-else>Nie Wziął Udziału</td>
                    <td v-if="k.oceniono">{{k.nazwa}}</td><td v-else>Nie Wziął Udziału</td>
                    <td v-if="k.oceniono">{{k.sumaTyp}}</td><td v-else>Nie Wziął Udziału</td>
                    <td v-if="k.oceniono">{{k.sumaRuch}}</td><td v-else>Nie Wziął Udziału</td>
                    <td v-if="k.oceniono">{{k.sumaGlowa}}</td><td v-else>Nie Wziął Udziału</td>
                    <td v-if="k.oceniono">{{k.sumaKloda}}</td><td v-else>Nie Wziął Udziału</td>
                    <td v-if="k.oceniono">{{k.sumaNogi}}</td><td v-else>Nie Wziął Udziału</td>
                    <td v-if="k.oceniono">{{k.suma}}</td><td v-else>Nie Wziął Udziału</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Oceniona",
        props: {
            klasaId: { type: Number }
        },
        data: function () {
            return {
                konie: []
            };
        },

        sockets: {
            Aktualne (dane) {
                this.konie = dane;
            }
        },
        computed () {}
    };
</script>

<style>
</style>
