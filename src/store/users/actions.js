import Vue from "vue"
import { mutationTypes as M } from "./common"

const actions = {
    updateUserDetails({ commit }, { userId, details }){
        commit(M.UPDATE_USER_DETAILS, { userId, details })
    },
    setCurrentUserFromAuth({ commit }){
        commit(M.SET_CURRENT_USER, Vue.fbAuthenticationUser)
    },
    inviteUser({ commit }, email) {
        console.log("pls invite", email, typeof commit);
    }
}

export default actions;
