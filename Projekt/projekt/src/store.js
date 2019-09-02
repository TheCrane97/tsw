import Vue from "vue";
import Vuex from "vuex";

import actions from "./store/actions";
import getters from "./store/getters";
import mutations from "./store/mutations";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        Sedziowie: [],
        Konie: [],
        Klasy: [],
        status: "",
        token: localStorage.getItem("token") || "",
        user: {}
    },

    actions,
    mutations,
    getters

});
