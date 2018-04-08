/* eslint-disable prefer-destructuring */

// import { db } from "./common"
import lodash from "lodash"

const getters = {
    currentUser(state) {
        try {
            return state.currentUser.dbUser.app
        } catch(e) {
            return null
        }
    },
    currentOrg(state, { currentUser }) {
        try {
            const orgs = currentUser.orgs
            if(!orgs)
                return null

            if(state.selectedOrgId) {
                return state.selectedOrgId;
            }

            return lodash.findKey(orgs, o => o.default) || lodash.first(lodash.keys(orgs))
        } catch(e) {
            return null
        }
    },
}

export default getters;
