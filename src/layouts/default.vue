<template>
    <q-layout view="lHh Lpr lFf">
        <q-layout-header v-model="state">
            <q-toolbar color="primary">
                <q-btn flat
                       dense
                       round
                       @click="leftDrawerOpen = !leftDrawerOpen"
                       aria-label="Menu">
                    <q-icon name="menu" />
                </q-btn>

                <q-toolbar-title>
                    Sharing Warmth
                </q-toolbar-title>
            </q-toolbar>
            <q-tabs>
                <q-route-tab slot="title"
                             icon="fas fa-bed"
                             to="/sites"
                             replace
                             label="Home" />
                <q-route-tab slot="title"
                             icon="fas fa-user-secret"
                             to="/dispatch"
                             replace
                             label="Dispatch" />
                <q-route-tab slot="title"
                             icon="fas fa-bus"
                             to="/driver"
                             replace
                             label="Driver" />
                <q-route-tab slot="title"
                             icon="view_day"
                             to="/supplies"
                             replace
                             label="Supplies" />
            </q-tabs>
        </q-layout-header>

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
                <q-item @click.native="openPage('/admin/user')">
                    <q-item-side icon="fas fa-life-saver" />
                    <q-item-main label="Admin"
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

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import Vue from "vue"

export default {
    name: 'LayoutDefault',
    data() {
        return {
            leftDrawerOpen: false, // this.$q.platform.is.desktop,
            state: true,
        };
    },
    methods: {
        openURL,
        openPage(page) {
            this.$router.push(page);
        },
        hideHeader() {
            this.state = false;
        },
        showHeader() {
            this.state = true;
        },
        signOut() {
            Vue.fbAuthenticationMethods.signOut()
        }
    },
    mounted() {
        // listen for an event
        this.$root.$on('hideHeader', this.hideHeader);
        this.$root.$on('showHeader', this.showHeader);
    },
    beforeDestroyed() {
        this.$root.$off('hideHeader', this.hideHeader);
        this.$root.$off('showHeader', this.showHeader);
    },
};
</script>

<style scoped>

</style>
