import Vue from 'vue'
import VueRouter from "vue-router";

import {store} from "./store";

import Home from "@/components/Home";
import Login from "@/components/Login";
import Clock from "@/components/Clock";
import Combinations from "@/components/Combinations";
import BookReader from "@/components/BookReader";
// import Timer from "@/components/Timer";

const loginPath = '/login';

const checkAuthentication = function (to, from, next) {
    store.dispatch('restoreSession');

    if (store.state.token.access || to.path === loginPath) {
        next();
    } else {
        next(loginPath);
    }
};

const routes = [
    {
        path: '',
        name: 'Inicio',
        component: Home
    },
    {
        path: '/combinations',
        name: 'Combinaciones',
        component: Combinations
    },
    // {
    //     path: '/timer',
    //     name: 'Temporizador',
    //     component: Timer
    // },
    {
        path: '/clock',
        name: 'Reloj',
        component: Clock
    },
    {
        path: '/books',
        name: 'Libros',
        component: BookReader,
        authority: 'books', beforeEnter: checkAuthentication
    },
    {
        path: loginPath,
        component: Login,
        beforeEnter: checkAuthentication
    },
]

Vue.use(VueRouter);

export const router = new VueRouter({
    routes,
    //mode: 'history', // TODO Check server config in all envs
});