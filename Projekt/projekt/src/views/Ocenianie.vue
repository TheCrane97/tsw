<template>
    <div>
        <div id="centruj">
            <button id="lewy" @click="lewo">&#8592;</button>
            <span  v-if="konik.length>0"> {{konik[index].nazwa}} </span>
            <button id="prawy" @click="prawo">&#8594;</button>
        </div>
        <KonOcen :kon="konik[index]"/>
        <div id="centruj">
            <button class="srodek" @click="koniec">Zakończ Ocenianie</button>
        </div>
    </div>
</template>

<script>
    import KonOcen from "../components/Oceniaj/KonOcen";
    export default {
        name: "Ocenianie",

        components: {
            KonOcen
        },

        data: function () {
            return {
                index: 0,
                max: true,
                min: false,
                klasa: null
            };
        },

        methods: {
            prawo () {
                if (this.index < this.konik.length - 1) this.index++;
            },

            lewo () {
                if (this.index > 0) this.index--;
            },
            koniec () {
                this.klasa = this.$store.getters.pobierzKlase(this.$route.params.id * 1);
                this.klasa.oceniono = 1;

                this.$store.dispatch("edytuj", {
                    sciezka: "admin/klasy",
                    obiekt: this.klasa,
                    tabela: "Klasy"
                });
                this.$router.push("/admin/klasy");
            }
        },

        computed: {
            konik () {
                return JSON.parse(
                    JSON.stringify(
                        this.$store.getters.pobierzKonie.filter(el => {
                            return el.klasa === this.$route.params.id * 1;
                        })
                    )
                );
            }
        }
    };
</script>

<style lang="less">
#centruj{
    position: relative;
    right: 0;
    left:0;
    margin: auto;
    width:200px;
    .srodek{
        margin:auto;
        margin-top: 5px;
        display:block;
        font-size:18px;
        border: none;
        color: black;
        border-radius: 4px;
        text-decoration: none;
        background-color:rgb(162, 92, 228);
    }
    #lewy{
        position: relative;
        left:0;
        margin: auto;
        width: 50px;
        margin-top: 10px;
    }
    span{
        position: relative;
        right:0;
        margin: auto;
        width: 5cm;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    #prawy{
        position: relative;
        right:0;
        margin: auto;
        width: 50px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
}
.srodek:hover{
    cursor: pointer;
}
</style>
