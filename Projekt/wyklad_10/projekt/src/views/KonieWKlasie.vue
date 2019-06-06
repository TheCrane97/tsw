/* eslint-disable */
<template>
    <div class="konie">
        <h1>
            <a v-on:click="klasa > 1 ? klasa -= 1 : klasa">&#x2190;</a>
            Klasa {{ klasa }}
            <a v-on:click="klasa += 1">&#x2192;</a>
        </h1>
        <table>
            <thead>
                <tr>
                    <th>Numer</th>
                    <th>Nazwa</th>
                    <th>Kraj</th>
                    <th>Rocznik</th>
                    <th>Masc</th>
                    <th>Plec</th>
                    <th>Wynik</th>
                    <th>Edytuj Wyniki</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in kon" v-bind:key="row['id']">
                    <td v-if="row['klasa'] == klasa" >{{row['numer']}}</td>
                    <td v-if="row['klasa'] == klasa" >{{row['nazwa']}}</td>
                    <td v-if="row['klasa'] == klasa" >{{row['kraj']}}</td>
                    <td v-if="row['klasa'] == klasa" >{{row['rocznik']}}</td>
                    <td v-if="row['klasa'] == klasa" >{{row['masc']}}</td>
                    <td v-if="row['klasa'] == klasa" >{{row['plec']}}</td>
                    <td v-if="row['klasa'] == klasa" ><span v-for="rod in row.wynik" v-bind:key="rod"><span v-for="(a,b) in rod" v-bind:key="a"><br />{{b+1}}: <span v-for="(i,j) in a" v-bind:key="i">{{j}}:{{i}} </span></span></span></td>
                    <td v-if="row['klasa'] == klasa"><router-link :to="{ name: 'edytujwynikikonia', params: { id: row['id'] }}">Edytuj Wyniki</router-link></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        name: "koniewklasie",
        props: {
            msg: String
        },
        data: function () {
            return {
                component: "koniewklasie",
                kon: null,
                klasa: 1,
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
  width: 1100px;
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
