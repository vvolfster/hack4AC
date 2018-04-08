<template>
    <div id="q-app" style="padding:18px">
        <div v-if="!authUserId" class="column items-center justify-between fillh">
            <div>
                <img src="statics/icons/icon-512x512.png" class="warmlogo">
                <h3>Finding Warmth</h3>
            </div>
            <q-btn size="lg" @click.stop="startLoginFlow">Log in</q-btn>
        </div>
        <div v-else-if="!matchesBasicRequirements">
            <welcomeUser :user="currentUser" @submit="onAcceptWelcome"/>
        </div>
        <div v-else-if="!matchesOrgRequirements">
            <wakeupEmitter v-if="compositeInviteId" @awake="acceptInvite"/>
            <div v-else>
                <registerOrg  :user="currentUser" @submit="onNewOrgWelcome"/>
            </div>
        </div>
        <wakeupEmitter v-else-if="compositeInviteId" @awake="acceptInvite"/>
        <router-view v-else />
    </div>
</template>

<script>
import Vue from 'vue';
import welcomeUser from '../src/components/welcomeUser';
import registerOrg from '../src/components/registerOrg';
import wakeupEmitter from "../src/components/wakeupEmitter";
import { userAdmin, org } from './storeWriter';

export default {
    name: 'App',
    components: {
        welcomeUser,
        registerOrg,
        wakeupEmitter
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
            return userAdmin.updateUserProfile(this.authUserId, userInfo);
        },
        onNewOrgWelcome(orgInfo) {
            console.log(orgInfo)
            org.createOrg(orgInfo)
        },
        acceptInvite(){
            return userAdmin.acceptInvite(this.authUserId, this.compositeInviteId)
        }
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

            for(const k in user.orgs) {
                const o = user.orgs[k]
                if(o && !o.banned)
                    return true;
            }
            return false;
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
    mounted() {
        const { compositeInviteId } = this.$route.query;
        if(compositeInviteId) {
            Vue.fbAuthenticationMethods.signOut()
        }
        // console.log("APP MOUNT", compositeInviteId)
    },
    watch: {
        compositeInviteId(current, prev){
            console.log("WATCHER CATCHES IT??", current, prev)
            // I am signing us out just so we don't end up having
            // a wrong user log in & accept the invite. The invites
            // are very loosely tied to the user!
            if(current && !prev){
                Vue.fbAuthenticationMethods.signOut()
                this.$route.query.params = {}
            }
        }
    }
};
</script>

<style>
    .warmlogo {
        width: 20vh;
        height: 20vh;
        object-fit: contain;
    }

    .fillh {
        height: 100%;
    }
</style>
