/* use for static constants */
/* eslint-disable no-useless-escape */
import Vue from "vue"

let database = null;
function db() {
    if(!database) {
        database = Vue.fbApps.app.database()
    }
    return database
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
const store = {
    getCurrentUserId(rootState, rootGetters) {
        const currentUser = rootGetters['users/currentUser']
        if (!currentUser) return null;

        return currentUser.id
    },
    getCurrentOrgId(rootState, rootGetters) {
        return rootGetters['users/currentOrg']
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
        const authId = store.getCurrentUserId(rootState, rootGetters)
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
                .then(snap => resolve(snap.val()))
                .catch(reject);
        });
    },
}

export default {
    validateEmail,
    store
}
