import { mutationTypes as M } from "./common"
import Vue from "vue"

const mutations = {
    [M.SET_ID](state, id) {
        state.id = id;
    },
    [M.SET_DATA](state, data) {
        Vue.set(state, "data", data)
    },
    [M.SET_MINI_STATE_FN](state, fn) {
        state.miniState.fn = fn;
    },
    [M.SET_MINI_STATE_REF](state, ref) {
        state.miniState.ref = ref;
    }
}

export default mutations;
