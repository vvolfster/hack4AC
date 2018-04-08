import Vue from 'vue';
import lodash from 'lodash';
import moment from "moment"
import Constants from '../../Constants';

const db = Vue.fbApps.app.database();

export default {
    updateTransitCount({ rootState, rootGetters }, { siteId, type, number }) {
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            if (number < 0) return reject(new Error(`qty cannot be less than 0`))

            return Constants.store
                .isValidSiteId(orgId, siteId)
                .then(() => {
                    return db
                        .ref(`org/${orgId}/site/${siteId}/${type}/inTransit`)
                        .set(number)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    reportIncident({ rootState, rootGetters }, { siteId }) {
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            const dateCreated = new Date().toISOString();
            return Constants.store
                .isValidSiteId(orgId, siteId)
                .then(() => {
                    return db
                        .ref(`org/${orgId}/site/${siteId}/incidents`)
                        .push({ dateCreated })
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    clearAllIncidents({ rootState, rootGetters }, { siteId }) {
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            return Constants.store
                .isValidSiteId(orgId, siteId)
                .then(() => {
                    const todayKey = moment().format("MM-DD-YYYY");
                    const dateResolved = new Date().toISOString();
                    return Constants.store
                        .getOrgValue(rootState, rootGetters)
                        .then(org => {
                            const incidents = lodash.get(org, `site.${siteId}.incidents`);
                            const historyIncidents = lodash.get(org, `site.${siteId}.history.${todayKey}.incidents`, {});
                            if (!incidents) return resolve('Nothing to resolve');

                            lodash.each(incidents, (i, k) => {
                                i.dateResolved = dateResolved;
                                historyIncidents[k] = i;
                            });

                            const promises = [
                                db.ref(`org/${orgId}/site/${siteId}/incidents`).set(null),
                                db.ref(`org/${orgId}/site/${siteId}/history/${todayKey}/incidents`).set(historyIncidents),
                            ];
                            return Promise.all(promises)
                                .then(resolve)
                                .catch(reject);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    updateCurrentQty({ rootState, rootGetters }, { siteId, type, number }) {
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            if (number < 0) return reject(new Error(`qty cannot be less than 0`))

            if (type !== 'guest' && type !== 'pets') return reject(new Error('bad type specified'));

            return Constants.store.isValidSiteId(orgId, siteId).then(() => {
                return db
                    .ref(`org/${orgId}/site/${siteId}/${type}/current`)
                    .set(number)
                    .then(resolve)
                    .catch(reject);
            })
        });
    },
    updateSuppliesNeeded({ rootState, rootGetters }, { siteId, suppliesNeeded }) {
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            return Constants.store.isValidSiteId(orgId, siteId).then(() => {
                return db
                    .ref(`org/${orgId}/site/${siteId}/suppliesNeeded`)
                    .set(suppliesNeeded)
                    .then(resolve)
                    .catch(reject);
            })
        });
    },
    logVolunteerHours({ rootState, rootGetters }, { siteId, count, hours }){
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            return Constants.store.isValidSiteId(orgId, siteId).then(() => {
                // create today's date
                const todayKey = moment().format("MM-DD-YYYY");
                db.ref(`org/${orgId}/site/${siteId}/history/${todayKey}/volunteer`).set({ hours, count }).then(resolve).catch(reject)
            })
        })
    }
};
