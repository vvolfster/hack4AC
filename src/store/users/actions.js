import Vue from 'vue';
import { db, mutationTypes as M } from './common';
import lodash from 'lodash';

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
                    return userRef.child(`orgs/${orgId}`).set({ default: isDefault }).then(resolve).catch(reject)
                });
            });
        }
        function addUserToOrgAndMarkInviteAsAccepted() {
            return new Promise((resolve, reject) => {
                const [orgId, inviteId] = compositeInviteId.split('@@@');
                if (!orgId || !inviteId) return reject(new Error('No org id or no invite id'));

                const orgRef = db.ref(`org/${orgId}`);
                return getUser().then((user) => {
                    const promises = [
                        orgRef.child(`users/${userId}`).set(user),
                        orgRef.child(`invites/${inviteId}/accepted`).set(true)
                    ];
                    return Promise.all(promises).then(resolve).catch(reject)
                });
            });
        }

        console.log(userId, compositeInviteId, profileInfo)
        return new Promise((resolve, reject) => {
            updateProfile()
                .then(addOrgToUser)
                .then(addUserToOrgAndMarkInviteAsAccepted)
                .then(resolve)
                .catch(reject);
        });
    },
};

export default actions;
