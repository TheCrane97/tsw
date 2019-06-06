import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/home",
            name: "home",
            component: () => import(/* webpackChunkName: "about" */ "./views/Home.vue")
        },
        {
            path: "/about",
            name: "about",
            component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
            path: "/klasy",
            name: "klasy",
            component: () => import(/* webpackChunkName: "about" */ "./views/Klasy.vue")
        },
        {
            path: "/konie",
            name: "konie",
            component: () => import(/* webpackChunkName: "about" */ "./views/Konie.vue")
        },
        {
            path: "/sedziowie",
            name: "sedziowie",
            component: () => import(/* webpackChunkName: "about" */ "./views/Sedziowie.vue")
        },
        {
            path: "/koniewklasie",
            name: "koniewklasie",
            component: () => import(/* webpackChunkName: "about" */ "./views/KonieWKlasie.vue")
        },
        {
            path: "/edytujsedzia",
            name: "edytujsedzia",
            component: () => import(/* webpackChunkName: "about" */ "./views/EdytujSedzia.vue")
        },
        {
            path: "/edytujkonia",
            name: "edytujkonia",
            component: () => import(/* webpackChunkName: "about" */ "./views/EdytujKonia.vue")
        },
        {
            path: "/edytujklase",
            name: "edytujklase",
            component: () => import(/* webpackChunkName: "about" */ "./views/EdytujKlase.vue")
        },
        {
            path: "/dodajsedzia",
            name: "dodajsedzia",
            component: () => import(/* webpackChunkName: "about" */ "./views/DodajSedzia.vue")

        },
        {
            path: "/dodajkonia",
            name: "dodajkonia",
            component: () => import(/* webpackChunkName: "about" */ "./views/DodajKonia.vue")

        },
        {
            path: "/dodajklase",
            name: "dodajklase",
            component: () => import(/* webpackChunkName: "about" */ "./views/DodajKlase.vue")

        },
        {
            path: "/edytujwynikikonia",
            name: "edytujwynikikonia",
            component: () => import(/* webpackChunkName: "about" */ "./views/EdytujWynikiKonia.vue")
        }
    ]
});
