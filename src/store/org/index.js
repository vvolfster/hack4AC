import Vue from 'vue';
import lodash from "lodash";
import Constants from '../../Constants';

const fbApp = Vue.fbApps.app;
const db = fbApp.database();

const actions = {
    create({ rootState, rootGetters }, orgInfo) {
        const userId = Constants.store.getCurrentUserId(rootState, rootGetters)
        if (!userId) return Promise.reject(new Error(`No user logged in to create org`));

        const user = rootGetters['users/currentUser'];
        if (!user) return Promise.reject(new Error(`No user logged in to create org`));

        function addOrgToUser(orgId) {
            return new Promise((resolve, reject) => {
                const isDefault = !lodash.keys(user.orgs).length || lodash.every(user.orgs, o => !o.isDefault || o.banned);
                return db
                    .ref(`users/${userId}/orgs/${orgId}`)
                    .set({ default: isDefault })
                    .then(resolve)
                    .catch(reject);
            });
        }
        function addUserToOrg(orgId) {
            return new Promise((resolve, reject) => {
                Promise.all([
                    db.ref(`org/${orgId}/users/${userId}`).set(user),
                    db.ref(`org/${orgId}/adminUsers/${userId}`).set(true)
                ]).then(resolve).catch(reject)
            })
        }

        return new Promise((resolve, reject) => {
            orgInfo.id = db.ref("org").push().key;
            db.ref(`org/${orgInfo.id}`).set(orgInfo)
                .then(() => {
                    addOrgToUser(orgInfo.id).then(() => addUserToOrg(orgInfo.id))
                })
                .catch(reject);
        });
    },
};

export default {
    actions,
    namespaced: true,
};
