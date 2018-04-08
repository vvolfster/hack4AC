import Vue from "vue"
import lodash from "lodash"
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
    },
    reportIncident({ rootState, rootGetters }, { siteId }){
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters)
        return new Promise((resolve, reject) => {
            if(!orgId)
                return reject(new Error(`No orgId`))

            const dateCreated = new Date().toISOString()
            return db.ref(`org/${orgId}/site/${siteId}/incidents`).push(dateCreated).then(resolve).catch(reject)
        })
    },
    clearAllIncidents({ rootState, rootGetters }, { siteId }){
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters)
        return new Promise((resolve, reject) => {
            if(!orgId)
                return reject(new Error(`No orgId`))

            const dateResolved = new Date().toISOString()
            return Constants.store.getOrgValue(orgId).then((org) => {
                const incidents = lodash.get(org, `site/${siteId}/incidents`);
                const historyIncidents = lodash.get(org, `site/${siteId}/history/incidents`);
                if(!incidents)
                    return resolve("Nothing to resolve");

                lodash.each(incidents, (i, k) => {
                    i.dateResolved = dateResolved;
                    historyIncidents[k] = i;
                })

                const promises = [
                    db.ref(`org/${orgId}/site/${siteId}/incidents`).set(null),
                    db.ref(`org/${orgId}/site/${siteId}/history/incidents`).set(historyIncidents)
                ]
                return Promise.all(promises).then(resolve).catch(reject)
            }).catch(reject)
            // return db.ref(`org/${orgId}/site/${siteId}/incidents`).push(dateCreated).then(resolve).catch(reject)
        })
    },
    updateCurrentQty({ rootState, rootGetters }, { siteId, type, number }){
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters)
        return new Promise((resolve, reject) => {
            if(!orgId)
                return reject(new Error(`No orgId`))

            if(type !== 'guest' || type !== 'pets')
                return reject(new Error("bad type specified"))

            return db.ref(`org/${orgId}/site/${siteId}/${type}/current`).set(number).then(resolve).catch(reject)
        })
    },
    updateSuppliesNeeded({ rootState, rootGetters }, { siteId, suppliesNeeded }){
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if(!orgId)
                return reject(new Error(`No orgId`))

            return db.ref(`org/${orgId}/site/${siteId}/suppliesNeeded`).set(suppliesNeeded).then(resolve).catch(reject)
        })
    }
}
