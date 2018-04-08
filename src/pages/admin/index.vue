<template>
    <q-layout view="lHh Lpr lFf">
        <q-layout-header v-if="isAdmin">
            <q-toolbar color="primary">
                <q-btn flat
                       dense
                       round
                       @click="leftDrawerOpen = !leftDrawerOpen"
                       aria-label="Menu">
                    <q-icon name="menu" />
                </q-btn>
                <q-toolbar-title>
                    Finding Warmth
                    <div slot="subtitle"></div>
                </q-toolbar-title>
            </q-toolbar>
            <q-tabs>
                <q-route-tab slot="title" icon="fas fa-user" to="/admin/user" replace label="Users" />
                <q-route-tab slot="title" icon="fas fa-user-plus" to="/admin/invite" replace label="Invites" />
                <q-route-tab slot="title" icon="fas fa-hospital" to="/admin/site" replace label="Sites" />
                <q-route-tab slot="title" icon="view_day" to="/admin/report" replace label="Reports" />
            </q-tabs>
        </q-layout-header>

        <div v-if="!isAdmin">
            <h4 class="text-center">You are not the admin of this organization.</h4>
        </div>
        <q-layout-drawer v-model="leftDrawerOpen"
                         :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
            <q-list no-border
                    link
                    inset-delimiter>
                <q-list-header id="header">
                    Warmth
                </q-list-header>
                <q-item @click.native="openPage('/')">
                    <q-item-side icon="fas fa-bed" />
                    <q-item-main label="Home"
                                 sublabel="" />
                </q-item>
                <q-item @click.native="openPage('/dispatch')">
                    <q-item-side icon="fas fa-user-secret" />
                    <q-item-main label="Dispatch"
                                 sublabel="" />
                </q-item>
                <q-item @click.native="openPage('/driver')">
                    <q-item-side icon="fas fa-bus" />
                    <q-item-main label="Driver"
                                 sublabel="" />
                </q-item>
                <q-item @click.native="openPage('/supplies')">
                    <q-item-side icon="view_day" />
                    <q-item-main label="Supplies"
                                 sublabel="" />
                </q-item>
                <q-item @click.native="openPage('/about')">
                    <q-item-side icon="fas fas fa-hand-peace" />
                    <q-item-main label="About"
                                 sublabel="" />
                </q-item>
                <q-item @click.native="signOut">
                    <q-item-side icon="fas fas fa-sign-out-alt" />
                    <q-item-main label="Sign out"
                                 sublabel="" />
                </q-item>
            </q-list>
        </q-layout-drawer>
        <q-page-container v-if="isAdmin">
            <router-view :org="orgData" />
        </q-page-container>
    </q-layout>
</template>

<style>

</style>

<script>
import { openURL } from 'quasar';

export default {
    name: 'admin',
    data() {
        return {
            leftDrawerOpen: false // this.$q.platform.is.desktop,
        };
    },
    computed: {
        currentOrg() {
            return this.$store.getters['users/currentOrg'];
        },
        zsubscriptions() {
            return this.currentOrg ? [`org/${this.currentOrg}`] : null;
        },
        orgData() {
            if (!this.zsubData) return null;

            return this.zsubData[`org/${this.currentOrg}`];
        },
        isAdmin() {
            return !this.orgData ? false : !!this.orgData.adminUsers[this.authUserId];
        },
    },
    methods: {
        openURL,
        openPage(page) {
            this.$router.push(page);
        },
    },
};
</script>
