/* eslint-disable */
<template>
    <div class="edytujkonia" v-if="kon !== null">
        <h1>Edycja Konia</h1>
        <table>
            <thead>
                <tr>
                    <th>Numer:  <input v-model="kon['numer']" type="text"></th>
                    <th>Klasa:  <input v-model="kon['klasa']" type="text"></th>
                    <th>Nazwa:  <input v-model="kon['nazwa']" type="text"></th>
                    <th>Kraj: <input v-model="kon['kraj']" type="text"></th>
                    <th>Rocznik:  <input v-model="kon['rocznik']" type="text"></th>
                    <th>Masc:  <input v-model="kon['masc']" type="text"></th>
                    <th>Plec:  <input v-model="kon['plec']" type="text"></th>
                    <th><button v-on:click="handleSubmit">Potwierdz</button></th>
                </tr>
                <tr>
                    <th>Hodowca:</th>
                    <th> <span v-for="(hod,index) in kon.hodowca" v-bind:key="hod">{{index}}<input v-model="kon.hodowca[index]" type="text"></span></th>
                    <th>Wlasciciel:</th>
                    <th> <span v-for="(hod,index) in kon.wlasciciel" v-bind:key="hod">{{index}}<input v-model="kon.wlasciciel[index]" type="text"></span></th>
                    <th>Rodowod:</th>
                    <th> <span v-for="(hod,index) in kon.rodowod" v-bind:key="hod">{{index}}-nazwa-kraj<input v-for="(a,b) in hod" v-bind:key="a" v-model="hod[b]" type="text"></span></th>
                </tr>
                <tr>
                    <th>Wyniki:</th>
                </tr>
                <tr>
                    <th v-for="hod in kon.wynik" v-bind:key="hod"></th>
                    <th> Sedzia 1</th>
                    <th> Sedzia 2</th>
                    <th> Sedzia 3</th>
                    <th> Sedzia 4</th>
                    <th> Sedzia 5</th>
                </tr>
                <tr v-for="hod in kon.wynik" v-bind:key="hod">
                    <th>Typ<br/>Glowa<br/>Kloda<br/>Nogi<br/>Ruch<br/></th>
                    <th v-for="wyn in hod" v-bind:key="wyn"><input v-for="(a,b) in wyn" v-bind:key="a" v-model="wyn[b]" type="text"></th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    export default {
        name: "edytujkonia",
        props: {
            msg: String
        },
        data: function () {
            return {
                id: this.$route.params.id,
                kon: null,
                loaded: Boolean
            };
        },
        methods: {
            handleSubmit () {
                this.$http.put("http://localhost:3000/konie/" + this.id, this.kon)
                    .then(response => {
                        console.log(response);
                        this.ajaxRequest = false;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {
                        this.$router.push("konie");
                    });
            }
        },
        created () {
            this.$http.get("http://localhost:3000/konie/" + this.id)
                .then(response => {
                    return response.json();
                }).then(data => { this.kon = data; })
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
