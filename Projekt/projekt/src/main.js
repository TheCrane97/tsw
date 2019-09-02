import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

import main from "./Layout/Main.vue";
import layoutkibic from "./Layout/Kibic.vue";

import "v-slim-dialog/dist/v-slim-dialog.css";
import SlimDialog from "v-slim-dialog";
import VueSocketIO from "vue-socket.io";

Vue.prototype.$http = Axios;
const token = localStorage.getItem("token");
if (token) {
    Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.use(new VueSocketIO({
    debug: true,
    connection: `http://${window.location.hostname}:4001`,
    vuex: {
        store,
        actionPrefix: "SOCKET_",
        mutationPrefix: "SOCKET_"
    }
}));

Vue.config.productionTip = false;

Vue.use(SlimDialog);
Vue.component("LayoutKibic", layoutkibic);
Vue.component("LayoutMain", main);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
