import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "querystring";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: {
            access: null,
            refresh: null,
            expiration: null
        },
        loading: false
    },
    getters: {
        authJson({token}) {
            if (!token.access) {
                return null;
            }
            return JSON.parse(window.atob(token.access.split('.')[1]))
        },
        authorities(state, getters) {
            let json = getters.authJson;
            return json == null ? [] : json.authorities;
        }
    },
    mutations: {
        recordToken(state, authData) {
            const {access_token, refresh_token, expires_in} = authData;
            state.token.access = access_token
            state.token.refresh = refresh_token
            state.token.expiration = Date.now() + (expires_in * 1000);
            localStorage.setItem('token', JSON.stringify(state.token));
        },
        clearToken(state) {
            state.token.access = null;
            state.token.refresh = null;
            state.token.expiration = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        login({commit}, payload) {

            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': "Basic " + window.btoa('turuntururun.com:123456')
            };

            const body = {
                grant_type: 'password',
                scope: 'read',
                username: payload.username,
                password: payload.password
            }
            return new Promise((resolve, reject) => {
                axios.post('https://turuntururun-oauth2.herokuapp.com/oauth/token', qs.stringify(body), {headers})
                    .then(value => {
                        commit('recordToken', value.data);
                        resolve(value);
                    }).catch(reject);
            })


        },
        restoreSession({state}) {
            if (state.token.access) return;

            let token = JSON.parse(localStorage.getItem('token'));
            if (!token) return

            if (token.expiration > Date.now()) {
                state.token.access = token.access;
                state.token.refresh = token.refresh;
                state.token.expiration = token.expiration;
            } else {
                //TODO Use refresh token
                localStorage.removeItem('token');
            }
        }
    }
});