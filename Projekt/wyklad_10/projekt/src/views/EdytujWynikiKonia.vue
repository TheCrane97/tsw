/* eslint-disable */
<template>
    <div class="edytujwynikikonia" v-if="kon !== null">
        <h1>Edycja Konia</h1>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Sedzia 1 </th>
                    <th>Sedzia 2</th>
                    <th>Sedzia 3</th>
                    <th>Sedzia 4</th>
                    <th>Sedzia 5</th>
                    <th><button v-on:click="handleSubmit">Potwierdz</button></th>
                </tr>
                <tr v-for="hod in kon.wynik" v-bind:key="hod">
                    <th>Typ<br/>Glowa<br/>Kloda<br/>Nogi<br/>Ruch<br/></th>
                    <th v-for="wyn in hod" v-bind:key="wyn"><span v-for="(a,b) in wyn" v-bind:key="a"><input @change="sumuj()" v-model="wyn[b]"  type="text"></span></th>
                    <th>Suma:{{sumaTyp}}<br/>Suma:{{sumaGlowa}}<br/>Suma:{{sumaKloda}}<br/>Suma:{{sumaNogi}}<br/>Suma:{{sumaRuch}}<br/></th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    export default {
        name: "edytujwynikikonia",
        props: {
            msg: String
        },
        data: function () {
            return {
                id: this.$route.params.id,
                kon: null,
                loaded: Boolean,
                sumaGlowa: Number,
                sumaKloda: Number,
                sumaNogi: Number,
                sumaRuch: Number,
                sumaTyp: Number
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
                        this.$router.push("koniewklasie");
                    });
            },
            sumuj () {
                let kon = this.kon;
                this.sumaGlowa = 0;
                this.sumaKloda = 0;
                this.sumaNogi = 0;
                this.sumaTyp = 0;
                this.sumaRuch = 0;
                this.finalSum = 0;
                let self = this;
                kon["wynik"]["noty"].forEach(function (nota) {
                    self.sumaGlowa = parseFloat(self.sumaGlowa) + parseFloat(nota["glowa"]);
                    self.sumaKloda = parseFloat(self.sumaKloda) + parseFloat(nota["kloda"]);
                    self.sumaNogi = parseFloat(self.sumaNogi) + parseFloat(nota["nogi"]);
                    self.sumaTyp = parseFloat(self.sumaTyp) + parseFloat(nota["typ"]);
                    self.sumaRuch = parseFloat(self.sumaRuch) + parseFloat(nota["ruch"]);
                });
            },
            ustaw () {
                this.sumaGlowa = 0;
                this.sumaKloda = 0;
                this.sumaNogi = 0;
                this.sumaTyp = 0;
                this.sumaRuch = 0;
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
