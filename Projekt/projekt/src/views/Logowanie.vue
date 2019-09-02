<template>
    <div id="login">
        <form @submit.prevent="login">
            <div class="logowanie">
                <div>
                    <span>Logowanie</span>
                </div>
                <div>
                    <input required v-model="email" placeholder="Username"/>
                </div>
                <div>
                    <input required v-model="password" type="password" placeholder="Password"/>
                </div>
                <div>
                    <button type="submit">Zaloguj</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                email: "",
                password: ""
            };
        },
        methods: {
            login: function () {
                let email = this.email;
                let password = this.password;
                this.$store.dispatch("login", { email, password })
                    .then(() => this.$router.push("/admin/home"))
                    .catch(err => console.log(err));
            }
        }
    };
</script>

<style lang="less" scoped>

.logowanie{
    position: absolute;
    top: 25%;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
span{
    font-size: 50px;
    margin-bottom: 6px;
    color: #8A2BE2
}
div{
    text-align: center;
    margin-top:8px;
}
input{
    width:230px;
    height:25px;
    border-radius: 4px;
}
button{
    width:230px;
    height:25px;
    color: #D4D8F9;
    background-color: #8A2BE2;
    font-size: 15px;
    border-radius: 4px;
}
</style>
