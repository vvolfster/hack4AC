/* eslint-disable prefer-destructuring */

// import { db } from "./common"
import lodash from "lodash"

const getters = {
    currentUser(state) {
        try {
            return state.currentUser.dbUser
        } catch(e) {
            return null
        }
    },
    currentOrg(state) {
        try {
            const orgs = state.currentUser.dbUser.orgs
            return lodash.findKey(orgs, o => o.default) || lodash.first(lodash.keys(orgs))
        } catch(e) {
            return null
        }
    }
}

export default getters;
