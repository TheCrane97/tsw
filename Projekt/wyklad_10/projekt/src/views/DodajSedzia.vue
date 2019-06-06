/* eslint-disable */
<template>
    <div class="dodajsedzia">
        <h1>Dodaj Sedziego</h1>
        <table>
            <thead>
                <tr>
                    <th>Sedzia:  <input v-model="sedzia" type="text"></th>
                    <th>Kraj:  <input  v-model="kraj" type="text"></th>
                    <th><button v-on:click="addJudge()">Dodaj</button></th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    export default {
        name: "dodajsedzia",
        props: {
            msg: String
        },
        data: function () {
            return {
                data: null,
                sedzia: null,
                kraj: null
            };
        },
        methods: {
            addJudge () {
                var data = {
                    "sedzia": this.sedzia,
                    "kraj": this.kraj
                };
                this.$http.post("http://localhost:3000/sedziowie/", data)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {
                        this.$router.push("sedziowie");
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
