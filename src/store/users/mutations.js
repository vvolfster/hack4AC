import { mutationTypes as M } from "./common"

const mutations = {
    [M.SET_CURRENT_USER](state, user) {
        state.currentUser = user
    }
}

export default mutations;
