import Vue from 'vue';
import { db, mutationTypes as M } from './common';
import lodash from 'lodash';

function getCurrentUserId(state) {
    const { currentUser } = state.users;
    if (!currentUser) return null;

    const { authId } = currentUser;
    return authId;
}

function getUserOrgRef(state, getters) {
    const authId = getCurrentUserId(state);
    const { currentOrg } = getters;
    if (!authId || !currentOrg) return null;

    return db.ref(`org/${currentOrg}/users/${authId}`);
}

function getUserOrgValue(state, getters) {
    const userOrgRef = getUserOrgRef(state, getters);
    if (!userOrgRef) return Promise.reject(new Error(`No auth user id`));

    return new Promise((resolve, reject) => {
        userOrgRef
            .once('value')
            .then(snap => resolve(snap.val()))
            .catch(reject);
    });
}

function getOrgRef(state, getters) {
    const { currentUser } = state.users;
    if (!currentUser) return null;

    const { authId } = currentUser;
    const { currentOrg } = getters;
    if (!authId || !currentOrg) return null;

    return db.ref(`org/${currentOrg}`);
}

function getOrgValue(state, getters) {
    const orgRef = getOrgRef(state, getters);
    if (!orgRef) return Promise.reject(new Error(`Failed to get org ref`));

    return new Promise((resolve, reject) => {
        orgRef
            .once('value')
            .then(snap => resolve(snap.val()))
            .catch(reject);
    });
}

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
    toggleOnSite({ state, getters }, { siteId }) {
        const orgUserRef = getUserOrgRef(state, getters);
        if (!orgUserRef) return Promise.reject(new Error('User not logged in or no site selected'));

        return new Promise((resolve, reject) => {
            getOrgValue(state, getters)
                .then(val => {
                    if (!val) return reject(new Error(`Could not get org`));

                    if (!val.site[siteId]) return reject(new Error('Invalid site. No such site exists in the org'));

                    return orgUserRef
                        .child('onSite')
                        .set(siteId)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    toggleLead({ state, getters }, { siteId, role }) {
        const orgRef = getOrgRef(state, getters);
        if (!orgRef || role !== 'shiftLead' || role !== 'siteLead')
            return Promise.reject(new Error('User not logged in or no site selected or incorrect role'));

        const promises = [getUserOrgValue(state, getters), getOrgValue(state, getters)];

        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(results => {
                    const [user, org] = results;
                    if (!user || !org) return reject(new Error(`Could not get org or user`));

                    if (!org.site[siteId]) return reject(new Error('Invalid site. No such site exists in the org'));

                    return orgRef
                        .child(`sites/${siteId}/${role}`)
                        .set(user)
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });
    },
};

export default actions;
