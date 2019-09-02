<template>
    <div id="admin">
        <Komunikat
            v-if="komunikatG"
            komunikat="Odśwież Dane"
            @tak="generuj"
            @nie="zamknijK"
        />
        <div>
            <button @click="komunikat">Generuj Nowe Dane</button>
        </div>
        <div>
            <img src="../assets/konie.png">
        </div>
    </div>
</template>

<script>
    import Komunikat from "../components/Komunikaty/KomunikatTN";

    export default {
        name: "Admin",
        data: function () {
            return {
                komunikatG: false
            };
        },
        components: {
            Komunikat
        },
        methods: {
            generuj () {
                this.komunikatG = false;
                let a = () => {
                    this.$store.dispatch("pobierzDane");
                };
                this.$store.dispatch("generuj", a);
            },
            zamknijK () {
                this.komunikatG = false;
            },
            komunikat () {
                this.komunikatG = true;
            }
        },
        computed: {
            konik () {
                return JSON.parse(JSON.stringify(this.$store.getters.pobierzKonia(10)));
            }
        }
    };
</script>

<style lang="less" scoped>

button {
  margin:auto;
  margin-top: 50px;
  display:block;
  width: 200px;
  height: 50px;
  color:black;
  background-color: blueviolet;
  border-radius:3px;
}
img {
    margin:auto;
    margin-top: 50px;
    display:block;
    width:1000px;
    height: 500px;
}

</style>
