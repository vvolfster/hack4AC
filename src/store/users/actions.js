import Vue from 'vue';
import { db, mutationTypes as M } from './common';
import lodash from 'lodash';
import Constants from "../../Constants"

const actions = {
    updateUserDetails({ commit }, { userId, details }) {
        commit(M.UPDATE_USER_DETAILS, { userId, details });
        return Promise.resolve();
    },
    setCurrentUserFromAuth({ commit }) {
        commit(M.SET_CURRENT_USER, Vue.fbAuthenticationUser);
        return Promise.resolve();
    },
    inviteUser({ getters }, email) {
        return new Promise((resolve, reject) => {
            const { currentOrg } = getters;
            if (!currentOrg) return reject(new Error(`Unable to invite ${email}. No current org`));

            return db
                .ref(`org/${currentOrg}/invites`)
                .push({
                    email,
                    accepted: false,
                    revoked: false,
                    dateCreated: new Date().toISOString(),
                    orgId: currentOrg,
                })
                .then(resolve)
                .catch(reject);
        });
    },
    acceptInvite(context, { userId, compositeInviteId, profileInfo }) {
        const userRef = db.ref(`users/${userId}`);
        function getUser() {
            return new Promise(resolve => {
                return userRef.once('value').then(snap => resolve(snap.val()));
            });
        }
        function updateProfile() {
            return new Promise((resolve, reject) => {
                if (profileInfo && lodash.keys(profileInfo).length) {
                    userRef
                        .update(profileInfo)
                        .then(resolve)
                        .catch(reject);
                }
                return resolve();
            });
        }
        function addOrgToUser() {
            return new Promise((resolve, reject) => {
                const [orgId] = compositeInviteId.split('@@@');
                if (!orgId) return reject(new Error('No org id'));

                return getUser().then(user => {
                    const isDefault = !lodash.keys(user.orgs).length;
                    return userRef
                        .child(`orgs/${orgId}`)
                        .set({ default: isDefault })
                        .then(resolve)
                        .catch(reject);
                });
            });
        }
        function addUserToOrgAndMarkInviteAsAccepted() {
            return new Promise((resolve, reject) => {
                const [orgId, inviteId] = compositeInviteId.split('@@@');
                if (!orgId || !inviteId) return reject(new Error('No org id or no invite id'));

                const orgRef = db.ref(`org/${orgId}`);
                return getUser().then(user => {
                    const promises = [orgRef.child(`users/${userId}`).set(user), orgRef.child(`invites/${inviteId}/accepted`).set(true)];
                    return Promise.all(promises)
                        .then(resolve)
                        .catch(reject);
                });
            });
        }

        return new Promise((resolve, reject) => {
            updateProfile()
                .then(addOrgToUser)
                .then(addUserToOrgAndMarkInviteAsAccepted)
                .then(resolve)
                .catch(reject);
        });
    },
    setSelectedOrgId({ commit }, id) {
        commit(M.SET_SELECTED_ORG_ID, id);
        return Promise.resolve();
    },
    toggleOnSite({ rootState, rootGetters }, { siteId }) {
        const orgUserRef = Constants.store.getUserOrgRef(rootState, rootGetters);
        if (!orgUserRef) return Promise.reject(new Error('User not logged in or no site selected'));

        const promises = [Constants.store.getOrgValue(rootState, rootGetters), Constants.store.getUserOrgValue(rootState, rootGetters)];

        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(results => {
                    const [org, user] = results;
                    if (!user || !org) return reject(new Error(`Could not get org or user`));

                    if (!org.site[siteId]) return reject(new Error('Invalid site. No such site exists in the org'));

                    const value = user.onSite ? null : siteId;
                    return orgUserRef
                        .child('onSite')
                        .set(value)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    toggleLead({ rootState, rootGetters }, { siteId, role }) {
        // console.log(siteId, role)
        const orgRef = Constants.store.getOrgRef(rootState, rootGetters);
        if (!orgRef || (role !== 'shiftLead' && role !== 'siteLead'))
            return Promise.reject(new Error('User not logged in or no site selected or incorrect role'));

        const promises = [Constants.store.getUserOrgValue(rootState, rootGetters), Constants.store.getOrgValue(rootState, rootGetters)];

        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(results => {
                    const [user, org] = results;
                    if (!user || !org) return reject(new Error(`Could not get org or user`));

                    if (!org.site[siteId]) return reject(new Error('Invalid site. No such site exists in the org'));

                    return orgRef
                        .child(`site/${siteId}/${role}`)
                        .set(user)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    setUserActiveState({ rootState, rootGetters }, { userId, value }){
        const orgId = Constants.store.getCurrentOrgId(rootState, rootGetters)
        const authUserId = Constants.store.getCurrentUserId(rootState, rootGetters)
        const orgRef = Constants.store.getOrgRef(rootState, rootGetters);
        if(!orgRef)
            return Promise.reject(new Error(`no org ref`));

        if(authUserId === userId) {
            Vue.toast.negative(`Cannot change active status of self`)
            return Promise.resolve(`Cannot change active status of self`)
        }

        const orgUserRef = orgRef.child(`users/${userId}`);
        return new Promise((resolve, reject) => {
            const userIsPartOfOrg = () => {
                return new Promise((resolve, reject) => {
                    orgRef.child(`users/${userId}`).once('value').then((snap) => {
                        return snap.val() ? resolve() : reject(new Error(`User is not part of the org!`))
                    })
                })
            }

            userIsPartOfOrg().then(() => {
                const userOrgRef = db.ref(`users/${userId}/orgs/${orgId}`)
                const promises = [
                    userOrgRef.set(value),
                    orgUserRef.child('banned').set(!value)
                ]
                Promise.all(promises).then(resolve).catch(reject)
            }).catch(reject)
        })
    }
};

export default actions;
