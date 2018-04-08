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
                const ref = db.ref(`org/${orgId}/site/${siteId}/${type}`)
                const promises = [
                    ref.child(`current`).set(number),
                    ref.child(`lastUpdated`).set(new Date().toISOString())
                ]
                Promise.all(promises).then(resolve).catch(reject)
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
    },
    addSite({ rootState, rootGetters }, { siteData }) {
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            return Constants.store.isValidSiteData(siteData).then(() => {
                const ref = db.ref(`org/${orgId}/site`)
                siteData.id = ref.push().key;
                ref.child(siteData.id).set(siteData).then(resolve).catch(reject)
            }).catch(reject)
        })
    },
    updateSite({ rootState, rootGetters }, { siteId, siteData }) {
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            const validateSiteId = () => Constants.store.isValidSiteId(orgId, siteId)
            const validateSiteData = () => Constants.store.isValidSiteData(siteData)

            return validateSiteId().then(validateSiteData).then(() => {
                db.ref(`org/${orgId}/site/${siteId}`).set(siteData).then(resolve).catch(reject)
            }).catch(reject)
        })
    },
    resetCounts({ rootState, rootGetters }){
        console.log('reset the ccounts')
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters);
        return new Promise((resolve, reject) => {
            if (!orgId) return reject(new Error(`No orgId`));

            return Constants.store.getOrgValue(rootState, rootGetters).then((org) => {
                if (!org) return reject(new Error(`No org`));
                if (!org.site) {
                    console.log('org has no sites', org.site)
                    return resolve('org has no sites');
                }

                const promises = []
                const siteParentRef = db.ref(`org/${orgId}/site`)
                lodash.each(org.site, (v, siteId) => {
                    promises.push(siteParentRef.child(`${siteId}/guest/count`).set(0))
                    promises.push(siteParentRef.child(`${siteId}/pets/count`).set(0))
                })
                console.log('numPromises', promises.length)

                return Promise.all(promises).then(resolve).catch(reject)
            })
        })
    }
};
