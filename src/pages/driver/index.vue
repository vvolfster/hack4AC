<template>
    <q-page class="flex driver--page">
        <q-list highlight
                class="driver--list">
            <q-list-header>Sites</q-list-header>
            <div v-for="(s, key) in sites"
                 :key="key">
                <site-card :site="s"
                           @siteClicked="clickSite" />
            </div>

        </q-list>
        <q-modal v-if="driverModalVis"
                 v-model="driverModalVis">
            <div class="column">
                <h4>{{currentSite.title}}</h4>
                <!-- PEOPLE BAR -->
                <q-item-tile v-if="isChildFriendly"
                             class="col-3"
                             icon="fas fa-child"
                             color="green" />
                <q-item-tile class="col-3"
                             v-if="isAdultFriendly"
                             icon="fas fa-male"
                             color="green" />
                <q-progress class="col-6"
                            :percentage="getPercentPeople(currentSite)"
                            style="height: 15px" /> {{ moment(currentSite.guest.lastUpdated).fromNow() }}
                <div class="col-3">{{ currentSite.guest.current }}/{{ currentSite.guest.max }}</div>
                <q-item-tile v-if="countNeedsUpdated"
                             icon="alarm"
                             color="red" />
                <quick-number :value="currentSite.guest.inTransit" v-on:input="changeInTransit"></quick-number>
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
    height: 100%;
}
.driver--list {
    width: 100%;
    height: 100%;
}
</style>

<script>
// import lodash from "lodash";
// import moment from "moment";
import siteCard from '../../components/siteCard';
import quickNumber from '../../components/quickNumber';

export default {
    name: 'driver',
    components: {
        siteCard,
        quickNumber
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
                console.log('sub data', this.zsubData['org/egan']);
                return this.zsubData['org/egan'].site;
            } catch (e) {
                return {};
            }
        },
    },
    created() {},
    mounted() {
        // const self = this;
        // this.$nextTick(() => {
        //     try {
        //     } catch (e) {
        //         //
        //     }
        // });
    },
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
        isAccessible() {
            return this.site.supports.ADA;
        },
        isPetFriendly() {
            return this.site.supports.pets;
        },
        isAdultFriendly() {
            return this.site.supports.ageGroup === 'adult';
        },
        isChildFriendly() {
            return this.site.supports.ageGroup === 'child';
        },
        changeInTransit(value){
            console.log("intransit change", value)
        }
    },
};
</script>
