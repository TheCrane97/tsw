/* eslint-disable */
<template>
    <div class="klasy">
        <h1>Klasy</h1>
        <h1><router-link :to="{ name: 'dodajklase'}">Dodaj Klase</router-link></h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Numer</th>
                    <th>Kategoria</th>
                    <th>Komisja</th>
                    <th>Edycja</th>
                    <th>Usun</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in klasa" v-bind:key="row['id']">
                    <td>{{row['id']}}</td>
                    <td>{{row['numer']}}</td>
                    <td>{{row['kat']}}</td>
                    <td><span v-for="sedzia in row['komisja']" v-bind:key="sedzia">{{ sedzia }}, </span></td>
                    <td><router-link :to="{ name: 'edytujklase', params: { id: row['id'] }}">Edytuj</router-link></td>
                    <td><button v-on:click="deleteClass(row.id)">Usun</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "klasy",
        props: {
            msg: String
        },
        data: function () {
            return {
                klasa: null
            };
        },
        methods: {
            deleteClass (id) {
                this.$http.delete("http://localhost:3000/klasy/" + id)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {
                        this.fetchData();
                    });
            },
            fetchData: function () {
                this.$http.get("http://localhost:3000/klasy")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.klasa = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },

        mounted () {
            this.fetchData();
        }
    };
</script>
<style scoped lang="less">
h1{
    text-align:center;
}
table {
  font-family: 'Open Sans', sans-serif;
  width: 1200px;
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
