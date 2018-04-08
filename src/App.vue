<template>
    <div id="q-app">
        <div v-if="!authUserId">
            <q-btn @click.stop="startLoginFlow">Log in please</q-btn>
            <br/> <br/> <br/>
            <q-btn
                @click="$router.push('/registerOrg')"
                color="primary"
                label="Looking for a different team"
            />
        </div>
        <div v-else-if="!matchesBasicRequirements">
            <welcomeUser :user="currentUser"
                         @submit="onAcceptWelcome" />
        </div>
        <div v-else-if="!matchesOrgRequirements">
            <registerOrg  :user="currentUser"
                         @submit="onNewOrgWelcome" />
        </div>
        <div v-else>
            <router-view />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import welcomeUser from '../src/components/welcomeUser';
import registerOrg from '../src/components/registerOrg';
import { userAdmin, org } from './storeWriter';

export default {
    name: 'App',
    components: {
        welcomeUser,
        registerOrg
    },
    methods: {
        startLoginFlow() {
            Vue.fbAuthenticationMethods.startLoginFlow();
        },
        onAcceptWelcome(userInfo) {
            userAdmin.acceptInvite(this.authUserId, this.compositeInviteId, userInfo);
        },
        onNewOrgWelcome(orgInfo) {
            console.log(orgInfo)
            org.createOrg(orgInfo)
        },
    },
    computed: {
        zsubscriptions() {
            if (this.authUserId) {
                return [`users/${this.authUserId}`];
            }
            return null;
        },
        currentUser() {
            if (!this.zsubData) return null;

            return this.zsubData[`users/${this.authUserId}`];
        },
        matchesOrgRequirements() {
            const user = this.currentUser;
            if(!user)
                return false;

            if (!user.orgs) {
                return false;
            }

            return Object.keys(user.orgs).length > 0;
        },
        matchesBasicRequirements() {
            const user = this.currentUser;
            if(!user)
                return false;
            return user.firstName && user.lastName && user.email && user.phone;
        },
        compositeInviteId() {
            return this.$route.query.compositeInviteId;
        },
    },
};
</script>

<style>

</style>
