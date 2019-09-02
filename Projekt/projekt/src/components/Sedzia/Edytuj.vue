<template>
    <div id="edytowanie">
        <h1>Edytuj Sedziego</h1>
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
                        <input v-model="kopia['sedzia']" class="input" type="text">
                    </th>
                    <th>
                        <input v-model="kopia['kraj']" class="input" type="text">
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
            <button v-if="!pole1 && !pole2" v-on:click="edytuj">Edytuj</button>
            <button @click="zamknij" style="background-color:red">Cofnij</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EdytujSedzia",

        data: function () {
            return {
                kopia: {
                    sedzia: null,
                    kraj: null
                },
                sedzia: null
            };
        },
        props: {
            sedziaId: { default: -1, type: Number }
        },
        methods: {
            edytuj () {
                this.sedzia.sedzia = this.kopia.sedzia;
                this.sedzia.kraj = this.kopia.kraj;
                this.$store.dispatch("edytuj", {
                    sciezka: "admin/sedziowie",
                    obiekt: this.sedzia,
                    tabela: "Sedziowie"
                });
                this.$emit("zamknijEdytuj");
            },
            zamknij () {
                this.$emit("zamknijEdytuj");
            }
        },

        computed: {
            pole1 () {
                if (this.kopia.sedzia.length < 2) {
                    return true;
                } else {
                    return false;
                }
            },
            pole2 () {
                if (this.kopia.kraj.length < 2) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        created () {
            console.log(this.sedziaId);
            if (this.sedziaId > -1) {
                this.kopia.sedzia = this.$store.getters.pobierzSedziego(
                    this.sedziaId
                ).sedzia;
                this.kopia.kraj = this.$store.getters.pobierzSedziego(this.sedziaId).kraj;
                this.sedzia = this.$store.getters.pobierzSedziego(this.sedziaId);
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
