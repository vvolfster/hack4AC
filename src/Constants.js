/* use for static constants */
/* eslint-disable no-useless-escape */
import Vue from 'vue';
import lodash from "lodash";

let database = null;
function db() {
    if (!database) {
        database = Vue.fbApps.app.database();
    }
    return database;
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const store = {
    isValidSiteId(orgId, siteId){
        return new Promise((resolve, reject) => {
            db().ref(`org/${orgId}/site/${siteId}`).once('value').then((snap) => {
                return snap.val() ? resolve()  : reject(new Error(`invalid side id ${siteId}`))
            })
        })
    },
    isValidSiteData(siteData) {
        return new Promise((resolve, reject) => {
            const requiredKeys = [
                "active",
                "guest",
                "pets",
                "shiftLead",
                "siteLead",
                "suppliesNeeded",
                "supports",
                "volunteer",
            ]
            const keys = lodash.keys(siteData)
            const diff = lodash.difference(requiredKeys, keys)
            if(diff.length)
                return reject(new Error(`siteData is missing the following keys: ${diff}`))

            const maxGuestCount = lodash.get(siteData, "guest.max")
            if(!lodash.isNumber(maxGuestCount) || maxGuestCount < 0)
                return reject(new Error(`Incorrect value for max guest count: ${maxGuestCount}`));

            const maxPetCount = lodash.get(siteData, "pets.max")
            if(!lodash.isNumber(maxPetCount) || maxPetCount < 0)
                return reject(new Error(`Incorrect value for max pet count: ${maxPetCount}`))

            return resolve();
        })
    },
    getCurrentUserId(rootState, rootGetters) {
        const currentUser = rootGetters['users/currentUser'];
        if (!currentUser) return null;

        return currentUser.id;
    },
    getCurrentOrgId(rootState, rootGetters) {
        return rootGetters['users/currentOrg'];
    },
    getUserOrgRef(rootState, rootGetters) {
        const authId = store.getCurrentUserId(rootState, rootGetters);
        const currentOrg = rootGetters['users/currentOrg'];
        if (!authId || !currentOrg) return null;

        return db().ref(`org/${currentOrg}/users/${authId}`);
    },

    getUserOrgValue(rootState, rootGetters) {
        const userOrgRef = store.getUserOrgRef(rootState, rootGetters);
        if (!userOrgRef) return Promise.reject(new Error(`No auth user id`));

        return new Promise((resolve, reject) => {
            userOrgRef
                .once('value')
                .then(snap => resolve(snap.val()))
                .catch(reject);
        });
    },
    getOrgRef(rootState, rootGetters) {
        const authId = store.getCurrentUserId(rootState, rootGetters);
        const currentOrg = rootGetters['users/currentOrg'];
        if (!authId || !currentOrg) return null;

        return db().ref(`org/${currentOrg}`);
    },
    getOrgValue(rootState, rootGetters) {
        const orgRef = store.getOrgRef(rootState, rootGetters);
        if (!orgRef) return Promise.reject(new Error(`Failed to get org ref`));

        return new Promise((resolve, reject) => {
            orgRef
                .once('value')
                .then((snap) => {
                    resolve(snap.val());
                })
                .catch(reject);
        });
    },
};

export default {
    validateEmail,
    store,
};
