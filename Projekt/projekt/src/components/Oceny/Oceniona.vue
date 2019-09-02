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
                    <td>{{k.numer}}</td>
                    <td>{{k.nazwa}}</td>
                    <td v-if="k.oceniono">{{k.sumaTyp}}</td><td v-else>-</td>
                    <td v-if="k.oceniono">{{k.sumaRuch}}</td><td v-else>-</td>
                    <td v-if="k.oceniono">{{k.sumaGlowa}}</td><td v-else>-</td>
                    <td v-if="k.oceniono">{{k.sumaKloda}}</td><td v-else>-</td>
                    <td v-if="k.oceniono">{{k.sumaNogi}}</td><td v-else>-</td>
                    <td v-if="k.oceniono">{{k.suma}}</td><td v-else>Nie wziął udziału</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Oceniona",
        props: {
            klasaId: { type: Number },
            historyczna: { default: false }
        },
        data: function () {
            return {
                konie: []
            };
        },

        sockets: {
            MaszKonie (dane) {
                if (this.historyczna) this.konie = dane;
            },
            MaszAktualne (dane) {
                if (!this.historyczna) this.konie = dane;
            }
        },

        computed: {
            listaKoni () {
                return this.konie;
            }
        },
        created () {
            this.$socket.emit("DajKonie", {
                klasaId: this.klasaId,
                wybor: this.historyczna
            });
        },
        mounted () {
            console.log(this.konie);
        }
    };
</script>

<style>

</style>
