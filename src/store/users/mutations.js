import { mutationTypes as M } from "./common"

const mutations = {
    [M.SET_CURRENT_USER](state, user) {
        state.currentUser = user
    },
    [M.SET_SELECTED_ORG_ID](state, id) {
        state.selectedOrgId = id
    }
}

export default mutations;
