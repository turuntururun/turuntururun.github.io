import Vue from 'vue'
import {store} from "./store";

import Clock from "@/components/Clock";
import Combinations from "@/components/Combinations";
import Home from "@/components/Home";
import Login from "@/components/Login";
import BookReader from "@/components/BookReader";
import VueRouter from "vue-router";

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
    {path: '', component: Home},
    {path: '/clock', component: Clock},
    {path: '/combinations', component: Combinations},
    {path: loginPath, component: Login, beforeEnter: checkAuthentication},
    {path: '/books', component: BookReader, beforeEnter: checkAuthentication},
]

Vue.use(VueRouter);

export const router = new VueRouter({
    routes,
    //mode: 'history', // TODO Check server config in all envs
});