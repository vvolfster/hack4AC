<template>
    <div id="q-app">
        <div v-if="!authUserId">
            <button @click.stop="startLoginFlow">Log in please</button>
        </div>
        <div v-else-if="!matchesRequirements">
            <welcomeUser :user="currentUser"
                         @submit="onAcceptWelcome" />
        </div>
        <div v-else>
            <router-view />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import welcomeUser from '../src/components/welcomeUser';
import { userAdmin } from './storeWriter';

export default {
    name: 'App',
    components: {
        welcomeUser,
    },
    data() {
        return {
            isOrgConnectorPluginInstance: true
        }
    },
    methods: {
        startLoginFlow() {
            Vue.fbAuthenticationMethods.startLoginFlow();
        },
        onAcceptWelcome(userInfo) {
            userAdmin.acceptInvite(this.authUserId, this.compositeInviteId, userInfo);
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
        matchesRequirements() {
            const user = this.currentUser;
            if(!user)
                return false;

            const basicRequirements = user.firstName && user.lastName && user.email && user.phone;
            if (!basicRequirements || !user.orgs) {
                return false;
            }

            return Object.keys(user.orgs).length > 0;
        },
        compositeInviteId() {
            return this.$route.query.compositeInviteId;
        },
    },
};
</script>

<style>

</style>
