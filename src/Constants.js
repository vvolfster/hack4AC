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

function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}

const store = {
    isValidSiteId(orgId, siteId){
        return new Promise((resolve, reject) => {
            db().ref(`org/${orgId}/site/${siteId}`).once('value').then((snap) => {
                return snap.val() ? resolve()  : reject(new Error(`invalid side id ${siteId}`))
            })
        })
    },
    isValidSiteData(siteData, skipKeyCheck) {
        return new Promise((resolve, reject) => {
            if(!skipKeyCheck){
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
            }

            const skippable = (i) => skipKeyCheck && lodash.isNull(i)
            const active = lodash.get(siteData, "active")
            const maxGuestCount = lodash.get(siteData, "guest.max")
            const maxPetCount = lodash.get(siteData, "pets.max")
            const supportsADA = lodash.get(siteData, "supports.ADA")
            const supportsPets = lodash.get(siteData, "supports.pets")
            const ageGroup = lodash.get(siteData, "supports.ageGroup")

            if(!skippable(active) && (!lodash.isBoolean(active)))
                return reject(new Error(`supports.ADA should be a boolean`))

            if(!skippable(maxGuestCount) && (!lodash.isNumber(maxGuestCount) || maxGuestCount < 0))
                return reject(new Error(`Incorrect value for max guest count: ${maxGuestCount}`));

            if(!skippable(maxPetCount) && (!lodash.isNumber(maxPetCount) || maxPetCount < 0))
                return reject(new Error(`Incorrect value for max pet count: ${maxPetCount}`))

            if(!skippable(supportsADA) && (!lodash.isBoolean(supportsADA)))
                return reject(new Error(`supports.ADA should be a boolean`))

            if(!skippable(supportsPets) && (!lodash.isBoolean(supportsPets)))
                return reject(new Error(`supports.pets should be a boolean`))

            if(!skippable(ageGroup) && (ageGroup !== 'adult' && ageGroup !== 'child')){
                return reject(new Error(`supports.ageGroup should be a one of ["adult", "child"]. Found: ${ageGroup}`))
            }

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
    clone,
    validateEmail,
    store,
};
