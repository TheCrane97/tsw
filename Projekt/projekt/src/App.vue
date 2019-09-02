<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>
<script>
    export default {
        name: "App",
        computed: {
            layout () {
                return this.$route.meta.layout;
            }
        },
        created: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(function (resolve, reject) {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch("logout");
                    }
                    throw err;
                });
            });
        }
    };
</script>
<style lang="less">
</style>
