<template>
    <div id="main">
        <div v-if="isLoggedIn" class="naglowek">
            <h1>
                <router-link :to="{ name:'Admin'}">Strona Główna </router-link>
                <router-link :to="{ name:'Klasy'}"> Klasy </router-link>
                <router-link :to="{ name:'Konie'}"> Konie </router-link>
                <router-link :to="{ name:'Sedziowie'}"> Sędziowie</router-link>
                <a @click="logout"> Wyloguj</a>
            </h1>
        </div>
        <div id="content">
            <slot/>
        </div>

    </div>
</template>
<script>
    export default {
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn;
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch("logout")
                    .then(() => {
                        this.$router.push("/login");
                    });
            }
        }
    };
</script>
<style lang="less">
h1{
    text-align:center;
}
table {
  font-family: 'Open Sans', sans-serif;
  border-collapse: collapse;
  border: 3px solid #44475C;
  margin: auto;
  border-left:none;
  border-right:none;
  border-bottom:none;
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
table tbody tr:nth-child(2n) td button{
  background: #D4D8F9;
}
.naglowek{
    text-align:center;
}
a{
    color: #CE4275;
    text-decoration: none;
}
a:hover{
    color: red;
    cursor: pointer;
}
.router-link-active{
    color: #8A2BE3;
    text-decoration: none;
}
button{
    font-size:17px;
    border: none;
    color: #CE4275;
    text-decoration: none;
    background-color:white;
}
button:hover{
    color: red;
    cursor: pointer;
}
</style>
