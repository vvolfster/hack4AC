import { mutationTypes as M } from "./common"

const actions = {
    updateUserDetails({ commit }, { userId, details }){
        commit(M.UPDATE_USER_DETAILS, { userId, details })
    }
}

export default actions;
