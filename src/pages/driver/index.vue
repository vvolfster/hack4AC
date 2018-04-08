<template>
    <q-page class="flex driver--page">
        <q-list class="driver--list">
            <!-- <q-list-header>Sites</q-list-header> -->
            <div v-for="(s, key) in sites"
                 :key="key"
                 v-if="s.active">
                <site-card :site="s"
                           @siteClicked="clickSite" />
            </div>

        </q-list>
        <q-modal v-if="driverModalVis"
                 v-model="driverModalVis"
                 >
            <div class="q-pa-lg">
                <big>{{currentSite.title}}</big>
                <small>{{currentSite.streetAddress}}</small>
                <people-bar :site="currentSite"></people-bar>
                <pet-bar :site="currentSite"></pet-bar>
                <quick-number label="Guests In Transit"
                              class="quickNum"
                              :value="currentSite.guest.inTransit"
                              v-on:input="changeInTransit(`guest`, $event)"></quick-number>
                <quick-number label="Pets In Transit"
                              class="quickNum"
                              :value="currentSite.pets.inTransit"
                              v-on:input="changeInTransit(`pets`, $event)"></quick-number>

            </div>
            <div class="column modal--close-button">
                <q-btn color="primary"
                       @click="closeModal"
                       label="Close" />
            </div>

        </q-modal>
    </q-page>
</template>

<style scoped>
.driver--page {
    width: 100%;
}
.driver--list {
    width: 100%;
}
.driver--modal {
    height: 100%;
}

.modal--close-button{
    margin-top:16px
}
.quickNum {
    width: 30hw;
}
</style>

<script>
/* eslint-disable prefer-destructuring */
// import lodash from "lodash";
// import moment from "moment";
import siteCard from '../../components/siteCard';
import quickNumber from '../../components/quickNumber';
import peopleBar from '../../components/peopleBar';
import petBar from '../../components/petBar';
import { site as siteWriter } from "../../storeWriter"

export default {
    name: 'driver',
    components: {
        siteCard,
        quickNumber,
        peopleBar,
        petBar,
    },
    props: [''],
    data() {
        return {
            currentSite: {},
            driverModalVis: false,
            zsubscriptions: ['org/egan'],
        };
    },

    computed: {
        sites() {
            try {
                // console.log('sub data', this.zsubData['org/egan']);
                return this.zsubData['org/egan'].site;
            } catch (e) {
                return {};
            }
        },
        countNeedsUpdated() {
            const now = +new Date();
            const thirtyMinutes = 30 * 60 * 1000;
            return this.currentSite.guest.lastUpdated + thirtyMinutes < now;
        },
    },
    created() {},
    mounted() {},
    methods: {
        getPercentPeople(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
        getPercentPets(site) {
            const x = site.pets.current / site.pets.max;
            return x * 100;
        },
        clickSite(site) {
            this.driverModalVis = true;
            this.currentSite = site;
            console.log('clicked site', site);
        },
        closeModal() {
            this.driverModalVis = false;
            this.currentSite = {};
        },
        // TODO BARTIMUS FIX
        // isAccessible() {
        //     return this.site.supports.ADA;
        // },
        // isPetFriendly() {
        //     return this.site.supports.pets;
        // },
        // isAdultFriendly() {
        //     return this.site.supports.ageGroup === 'adult';
        // },
        // isChildFriendly() {
        //     return this.site.supports.ageGroup === 'child';
        // },
        changeInTransit(type, value) {
            const { id } = this.currentSite
            console.log(id, type, value)
            /* eslint-disable-next-line */
            siteWriter.updateTransitCount(id, type, value)
        },
    },
};
</script>
