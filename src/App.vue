<template>
    <div id="q-app">
        <div v-if="!authUserId" class="fillh zpadded column items-center justify-between">
            <div style="flex: 1 1 100%;"></div>
            <div class="column items-center" style="flex: 0 0 20vh; ">
                <img src="statics/icons/icon-512x512.png" class="warmlogo">
                <h3 class="text-red-8">Finding Warmth</h3>
            </div>
            <div style="flex: 1 1 100%;"></div>
            <q-btn size="lg" class="bg-red-8 text-white fillw" @click.stop="startLoginFlow">Log in</q-btn>
        </div>
        <div v-else-if="!matchesBasicRequirements" class="zpadded">
            <welcomeUser :user="currentUser" @submit="onAcceptWelcome"/>
        </div>
        <div v-else-if="!matchesOrgRequirements" class="zpadded">
            <wakeupEmitter v-if="compositeInviteId" @awake="acceptInvite"/>
            <div v-else>
                <div class="fillh column items-center justify-between" v-if="!createOrgMode">
                    <div style="flex: 1 1 100%;">
                        <div class="column items-center" style="flex: 0 0 20vh;">
                            <img src="statics/icons/icon-512x512.png" class="warmlogo">
                            <div class="text-red-8 text-center">Looks like you are not part of any organizations. <br><br>Would you like to create one?</div>
                        </div>
                        <div style="flex: 1 1 100%;"></div>
                        <q-btn size="lg" class="bg-red-8 text-white fillw" @click.stop="createOrgMode = true">Create Organization</q-btn>
                    </div>
                </div>
                <registerOrg  v-else :user="currentUser" @submit="onNewOrgWelcome" @cancel="createOrgMode = false"/>
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
            isOrgConnectorPluginInstance: true,
            createOrgMode: false,
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
            return org.createOrg(orgInfo)
        },
        acceptInvite(){
            return userAdmin.acceptInvite(this.authUserId, this.compositeInviteId).then(() => this.$router.push("/"))
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
        object-fit: cover;
    }

    .fillh {
        height: 100vh;
    }

    .fillw {
        width: 100%
    }

    .zbot {
        position: absolute;
        bottom: 18px;
        width: 100%;
    }

    .zbtn {
        height: 6vh;
    }

    .zpadded {
        padding: 18px;
    }
</style>
