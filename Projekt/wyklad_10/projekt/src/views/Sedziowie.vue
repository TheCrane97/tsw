/* eslint-disable */
<template>
    <div class="sedziowie">
        <h1>Sedziowie</h1>
        <h1><router-link :to="{ name: 'dodajsedzia'}">Dodaj Sedziego</router-link></h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Sedzia</th>
                    <th>Kraj</th>
                    <th>Edycja</th>
                    <th>Usun</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in sedzia" v-bind:key="row['id']">
                    <td>{{row['id']}}</td>
                    <td>{{row['sedzia']}}</td>
                    <td>{{row['kraj']}}</td>
                    <td><router-link :to="{ name: 'edytujsedzia', params: { id: row['id'] }}">Edytuj</router-link></td>
                    <td><button v-on:click="deleteJudge(row.id)">Usun</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "sedziowie",
        props: {
            msg: String
        },
        data: function () {
            return {
                sedzia: null
            };
        },
        methods: {
            deleteJudge (id) {
                this.$http.delete("http://localhost:3000/sedziowie/" + id)
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
                this.$http.get("http://localhost:3000/sedziowie")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.sedzia = data;
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
