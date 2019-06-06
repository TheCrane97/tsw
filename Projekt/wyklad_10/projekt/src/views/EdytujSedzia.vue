/* eslint-disable */
<template>
    <div class="edytujsedzia" v-if="sedzia !== null">
        <h1>Edycja Sedziego</h1>
        <table>
            <thead>
                <tr>
                    <th>Sedzia: <input v-model="sedzia['sedzia']" type="text"></th>
                    <th>Kraj: <input v-model="sedzia['kraj']" type="text"></th>
                    <th><button v-on:click="handleSubmit">Potwierdz</button></th>
                </tr>
            </thead>
        </table>
    </div>
</template>
<script>
    export default {
        name: "edytujsedzia",
        props: {
            msg: String
        },
        data: function () {
            return {
                id: this.$route.params.id,
                sedzia: null,
                loaded: Boolean
            };
        },
        methods: {
            handleSubmit () {
                this.$http.put("http://localhost:3000/sedziowie/" + this.id, this.sedzia)
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
        created () {
            this.$http.get("http://localhost:3000/sedziowie/" + this.id)
                .then(response => {
                    return response.json();
                }).then(data => { this.sedzia = data; })
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
