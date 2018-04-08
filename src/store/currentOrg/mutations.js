import { mutationTypes as M } from "./common"

const mutations = {
    [M.SET_ID](state, id) {
        state.id = id;
    },
    [M.SET_DATA](state, data) {
        state.data = data
    }
}

export default mutations;
