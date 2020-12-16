import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        accounts: [
            {
                firstName: 'Alvarado, Eduardo Alfonso',
                startTime: '9:30',
                endTime: '10:30',
            },
            {
                firstName: 'Acuña López, Juliana',
                startTime: '11:00',
                endTime: '12.30',
            },
            {
                firstName: 'Arenales, Ingrid Lorena',
                startTime: '12:30',
                endTime: '13:30',
            },
            {
                firstName: 'Barreto ruíz, Aldana',
                startTime: '13:30',
                endTime: '16:00',
            },
            {
                firstName: 'Buitrado Lozano, Daniel Esteban',
                startTime: '16:30',
                endTime: '17:30',
            },
            {
                firstName: 'Delgado, Ángel David',
                startTime: '17:30',
                endTime: '19:00',
            }
        ]
    },
    mutations: {
        newAccount(state, payload) {
            state.accounts.push(payload)
        },
       
    },
    actions: {},
    modules: {}
})
