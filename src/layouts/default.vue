<template>
    <q-layout view="lHh Lpr lFf">
        <q-layout-header>
            <q-toolbar color="primary"
                       :glossy="$q.theme === 'mat'"
                       :inverted="$q.theme === 'ios'">
                <q-btn flat
                       dense
                       round
                       @click="leftDrawerOpen = !leftDrawerOpen"
                       aria-label="Menu">
                    <q-icon name="menu" />
                </q-btn>

                <q-toolbar-title>
                    Warmth
                <div slot="subtitle"></div>
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
                <q-list-header>Warmth</q-list-header>
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
                <q-item @click.native="openPage('/admin')">
                    <q-item-side icon="fas fa-life-saver" />
                    <q-item-main label="Admin"
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

export default {
    name: 'LayoutDefault',
    data() {
        return {
            leftDrawerOpen: this.$q.platform.is.desktop,
        };
    },
    methods: {
        openURL,
        openPage(page) {
            this.$router.push(page);
        },
    },
};
</script>

<style>

</style>
