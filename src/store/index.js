import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accounts: [
            { id: 1, content: "Alvarado, Eduardo Alfonso", start: "2020-12-04, 09:30:00", end: "2020-12-04, 10:30:00" },
            { id: 2, content: "Acuña López, Juliana", start: "2020-12-04, 11:00:00", end: "2020-12-04, 12:30:00" },
            { id: 3, content: "Arenales, Ingrid Lorena", start: "2020-12-04, 12:30:00", end: "2020-12-04, 13:30:00" },
            { id: 4, content: "Barreto ruíz, Aldana", start: "2020-12-04, 13:30:00", end: "2020-12-04, 16:00:00" },
            { id: 5, content: "Buitrado Lozano, Daniel Esteban", start: "2020-12-04, 16:30:00", end: "2020-12-04, 17:30:00" },
            { id: 6, content: "Delgado, Ángel David", start: "2020-12-04, 17:30:00", end: "2020-12-04, 19:00:00" },
        ]
    },
    getters: {
        accountsLength(state) {
            return state.accounts.length
        },
        getAccounts(state) {
            return state.accounts
        }
    },
    mutations: {
        newAccount(state, payload) {
            state.accounts.push(payload)
        },
        deleteAccount(state, { index }) {
            state.accounts.splice(index, 1);
        }
    },
    actions: {},
    modules: {}
})
