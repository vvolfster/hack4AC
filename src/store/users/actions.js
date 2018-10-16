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
    acceptInvite(context, { userId, compositeInviteId }) {
        if(!userId)
            return Promise.reject(new Error(`No userId`))

        if(!lodash.isString(compositeInviteId))
            return Promise.reject(new Error(`Composite invite id must be a string`))

        if(compositeInviteId.indexOf(`@@@`) === -1)
            return Promise.reject(new Error(`Invalid composite id. They are of the form: <num>@@@</num>`))

        const userRef = db.ref(`users/${userId}`);
        const [orgId, inviteId] = compositeInviteId.split('@@@');

        if (!orgId) return Promise.reject(new Error('No org id'));
        if (!inviteId) return Promise.reject(new Error(`no invite id`))

        function addOrgToUser(user) {
            return new Promise((resolve, reject) => {
                const isDefault = !lodash.keys(user.orgs).length || lodash.every(user.orgs, o => !o.isDefault || o.banned)
                return userRef
                    .child(`orgs/${orgId}`)
                    .set({ default: isDefault })
                    .then(resolve)
                    .catch(reject);
            });
        }
        function addUserToOrg(user) {
            return db.ref(`org/${orgId}/users/${userId}`).set(user);
        }
        function markInviteAsAccepted(){
            return new Promise((resolve, reject) => {
                if (!orgId || !inviteId) return reject(new Error('No org id or no invite id'));
                return db.ref(`org/${orgId}/invites/${inviteId}/accepted`).set(true).then(resolve).catch(reject)
            })
        }

        return new Promise((resolve, reject) => {
            const promises = [
                userRef.once('value'),
                db.ref(`org/${orgId}/invites/${inviteId}`).once('value')
            ]

            Promise.all(promises).then((results) => {
                const user = results[0].val()
                const invite = results[1].val()
                if(!user)
                    return reject(new Error(`User does not exist`));

                if(invite.accepted)
                    return resolve(`Invite alread accepted!!`);

                // check if user is already part of the thing
                if(user.orgs[orgId] !== null && user.orgs[orgId] !== undefined){
                    Vue.toast.positive(`You are already part of this org`);
                    return markInviteAsAccepted().then(resolve).catch(reject);
                }

                return addOrgToUser(user)
                    .then(() => addUserToOrg(user))
                    .then(markInviteAsAccepted)
                    .then(resolve)
                    .catch(reject)
            }).catch(reject)
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

                    if(!org.site)
                        return reject(new Error(`org has no site ${JSON.stringify(org, null, 2)}`));

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
        if (!orgRef || (role !== 'shiftLead' && role !== 'siteLead' && role !== 'kitchenLead'))
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
                    userOrgRef.child('banned').set(value),
                    orgUserRef.child('banned').set(!value)
                ]
                Promise.all(promises).then(resolve).catch(reject)
            }).catch(reject)
        })
    },
    updateUserProfile(context, { userId, profileInfo }){
        const userRef = db.ref(`users/${userId}`);
        function getUser() {
            return new Promise((resolve, reject) => {
                return userRef.once('value').then((snap) => {
                    return snap.val() ? resolve() : reject(new Error(`User does not exist!`))
                });
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
        return new Promise((resolve, reject) => {
            getUser().then(updateProfile).then(resolve).catch(reject)
        });
    }
};

export default actions;
