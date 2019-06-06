/* eslint-disable */
<template>
    <div class="konie">
        <h1>Konie</h1>
        <h1><router-link :to="{ name: 'dodajkonia'}">Dodaj Konia</router-link></h1>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Numer</th>
                    <th>Klasa</th>
                    <th>Nazwa</th>
                    <th>Kraj</th>
                    <th>Rocznik</th>
                    <th>Masc</th>
                    <th>Plec</th>
                    <th>Hodowca</th>
                    <th>Wlasciciel</th>
                    <th>Rodowod</th>
                    <th>Edytuj</th>
                    <th>Usun</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in kon" v-bind:key="row['id']">
                    <td >{{row['id']}}</td>
                    <td >{{row['numer']}}</td>
                    <td >{{row['klasa']}}</td>
                    <td >{{row['nazwa']}}</td>
                    <td >{{row['kraj']}}</td>
                    <td >{{row['rocznik']}}</td>
                    <td >{{row['masc']}}</td>
                    <td >{{row['plec']}}</td>
                    <td><span v-for="(hod,index) in row.hodowca" v-bind:key="hod"> {{index}}: {{hod}}<br /></span></td>
                    <td><span v-for="(hod,index) in row.wlasciciel" v-bind:key="hod"> {{index}}: {{hod}}<br /></span></td>
                    <td><span v-for="(rod,d) in row.rodowod" v-bind:key="rod"><br /> {{d}}-<span v-for="(a,b) in rod" v-bind:key="a"> {{b}}: {{a}}</span></span></td>
                    <td ><router-link :to="{ name: 'edytujkonia', params: { id: row['id'] }}">Edytuj</router-link></td>
                    <td ><button v-on:click="deleteHorse(row.id)">Usun</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "konie",
        props: {
            msg: String
        },
        data: function () {
            return {
                kon: null,
                sedzia: null
            };
        },
        methods: {
            fetchData: function () {
                this.$http.get("http://localhost:3000/konie")
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        this.kon = data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            deleteHorse (id) {
                this.$http.delete("http://localhost:3000/konie/" + id)
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
  width: 1400px;
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
