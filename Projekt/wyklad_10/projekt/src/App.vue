<template>
    <div id="app">
        <div>
            <ul>
                <li><router-link to="/home">Strona Główna</router-link></li>
                <li><router-link to="/koniewklasie">Panel Kibica</router-link></li>
                <li><router-link to="/konie">Konie</router-link></li>
                <li><router-link to="/klasy">Klasy</router-link></li>
                <li><router-link to="/sedziowie">Sedziowie</router-link></li>
            </ul>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
    };
</script>

<style lang="less">
h1{
    text-align:center;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 10%;
  background-color: #f1f1f1;
  height: 100%;
  position: fixed;
  overflow: auto;
}

li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

li a:hover {
  background-color: #555;
  color: white;
}
.active {
  background-color: #4CAF50;
  color: white;
}

</style>
