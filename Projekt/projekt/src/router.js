import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import Live from "./views/Live";
import Logowanie from "./views/Logowanie";
import Sedziowie from "./views/Sedziowie";
import Klasy from "./views/Klasy";
import Konie from "./views/Konie";
import Admin from "./views/Admin";
import Ocenianie from "./views/Ocenianie";

Vue.use(Router);

let router = new Router({
    routes: [{
        path: "/",
        name: "Live",
        meta: {
            layout: "LayoutKibic"
        },
        component: Live
    },
    {
        path: "/login",
        name: "login",
        meta: {
            layout: "LayoutMain"
        },
        component: Logowanie
    },
    {
        path: "/admin/sedziowie",
        name: "Sedziowie",
        meta: {
            layout: "LayoutMain",
            requiresAuth: true
        },
        component: Sedziowie
    },

    {
        path: "/admin/klasy",
        name: "Klasy",
        meta: {
            layout: "LayoutMain",
            requiresAuth: true
        },
        component: Klasy
    },

    {
        path: "/admin/konie",
        name: "Konie",
        meta: {
            layout: "LayoutMain",
            requiresAuth: true
        },
        component: Konie
    },

    {
        path: "/admin/home",
        name: "Admin",
        meta: {
            layout: "LayoutMain",
            requiresAuth: true
        },
        component: Admin
    },

    {
        path: "/admin/oceniaj/:id",
        name: "Ocenianie",
        meta: {
            layout: "LayoutKibic",
            requiresAuth: true
        },
        component: Ocenianie
    }
    ]
});
router.beforeEach((to, from, next) => {
    if (store.getters.pobierzKonie || store.getters.pobierzKlasy || store.getters.pobierzSedziowie) {
        store.dispatch("pobierzDane");
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});
export default router;
