/* eslint-disable */
<template>
    <div class="dodajkonia">
        <h1>Dodaj Konia</h1>
        <table>
            <thead>
                <tr>
                    <th>Numer: <input v-model="numer" type="text"></th>
                    <th>Kategoria: <input v-model="kategoria" type="text"></th>
                    <th>Komisja: <input v-model="komisja" type="text"></th>
                    <th><button v-on:click="addClass()">Dodaj</button></th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    export default {
        name: "dodajklase",
        props: {
            msg: String
        },
        data: function () {
            return {
                data: null,
                numer: null,
                kategoria: null,
                komisja: null
            };
        },
        methods: {
            addClass () {
                var data = {
                    "numer": this.numer,
                    "kat": this.kategoria,
                    "komisja": this.komisja
                };
                this.$http.post("http://localhost:3000/klasy/", data)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {
                        this.$router.push("klasy");
                    });
            }
        },

        mounted () {
        }
    };
</script>
<style scoped lang="less">
h1{
    text-align:center;
}
table {
  font-family: 'Open Sans', sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: auto;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475C;
  color: #FFF;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7D82A8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #D4D8F9;
}
</style>
