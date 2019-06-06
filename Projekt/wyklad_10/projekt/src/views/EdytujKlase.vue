/* eslint-disable */
<template>
    <div class="edytujklase" v-if="klasa !== null">
        <h1>Edycja Klasy</h1>
        <table>
            <thead>
                <tr>
                    <th>Numer:  <input v-model="klasa['numer']" type="text"></th>
                    <th>Kategoria: <input v-model="klasa['kat']" type="text"></th>
                    <th><button v-on:click="handleSubmit">Potwierdz</button></th>
                </tr>
                <tr>
                    <th>Komisja:</th>
                    <th> <span v-for="(sedzia,index) in klasa.komisja" v-bind:key="sedzia"><input v-model="klasa.komisja[index]" type="number"></span></th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    export default {
        name: "edytujklase",
        props: {
            msg: String
        },
        data: function () {
            return {
                id: this.$route.params.id,
                klasa: null,
                loaded: Boolean
            };
        },
        methods: {
            handleSubmit () {
                this.$http.put("http://localhost:3000/klasy/" + this.id, this.klasa)
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
        created () {
            this.$http.get("http://localhost:3000/klasy/" + this.id)
                .then(response => {
                    return response.json();
                }).then(data => { this.klasa = data; })
                .catch(err => {
                    console.log(err);
                });
            this.$forceUpdate();
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
