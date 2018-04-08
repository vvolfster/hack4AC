import Vue from "vue"
import Constants from "../../Constants"

const db = Vue.fbApps.app.database()

export default {
    updateTransitCount({ rootState, rootGetters }, { siteId, type, number }){
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters)
        return new Promise((resolve, reject) => {
            if(!orgId)
                return reject(new Error(`No orgId`))

            return db.ref(`org/${orgId}/site/${siteId}/${type}/inTransit`).set(number).then(resolve).catch(reject)
        })
    }
}
