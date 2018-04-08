import Vue from "vue"
import { db, mutationTypes as M } from "./common"

const actions = {
    updateUserDetails({ commit }, { userId, details }){
        commit(M.UPDATE_USER_DETAILS, { userId, details })
        return Promise.resolve()
    },
    setCurrentUserFromAuth({ commit }){
        commit(M.SET_CURRENT_USER, Vue.fbAuthenticationUser)
        return Promise.resolve()
    },
    inviteUser({ getters }, email) {
        return new Promise((resolve, reject) => {
            const { currentOrg } = getters;
            if(!currentOrg)
                return reject(new Error(`Unable to invite ${email}. No current org`))

            return db.ref(`org/${currentOrg}/invites`).push({
                email,
                accepted: false,
                revoked: false,
                dateCreated: new Date().toISOString(),
                orgId: currentOrg
            }).then(resolve).catch(reject)
        })
    }
}

export default actions;
