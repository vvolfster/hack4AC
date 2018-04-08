<template>
    <q-layout view="lHh Lpr lFf">
        <q-layout-header>
            <q-toolbar color="primary" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
                    <q-icon name="menu" />
                </q-btn>
                <q-toolbar-title>
                    Warm and Toasty Admin
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
            You are not the admin of your org!
        </div>
        <div v-else>
            <!-- <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
                <q-list no-border link inset-delimiter>
                    <q-list-header>Temporary Nav, put your links here</q-list-header>
                    <q-item @click.native="openPage('/')">
                        <q-item-side icon="home" />
                        <q-item-main label="Home" sublabel="" />
                    </q-item>
                    <q-item @click.native="openPage('/welcome')">
                        <q-item-side icon="rss feed" />
                        <q-item-main label="Welcome page" sublabel="" />
                    </q-item>
                    <q-item @click.native="openPage('/sites')">
                        <q-item-side icon="home" />
                        <q-item-main label="main list" sublabel="" />
                    </q-item>
                    <q-item @click.native="openPage('/dispatch')">
                        <q-item-side icon="home" />
                        <q-item-main label="dispatch" sublabel="" />
                    </q-item>
                    <q-item @click.native="openPage('/admin')">
                        <q-item-side icon="home" />
                        <q-item-main label="admin" sublabel="" />
                    </q-item>
                    <q-item @click.native="openPage('/supplydetail')">
                        <q-item-side icon="home" />
                        <q-item-main label="Supply Dashboard" sublabel="" />
                    </q-item>
                </q-list>
            </q-layout-drawer> -->

            <q-page-container>
                <router-view :org="orgData" />
            </q-page-container>
        </div>
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
            leftDrawerOpen: this.$q.platform.is.desktop,
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
