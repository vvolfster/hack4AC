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
                {{currentSite.guest.current}}/{{currentSite.guest.max}}
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

export default {
    name: 'driver',
    components: {
        siteCard,
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
        getPercent(site) {
            const x = site.guest.current / site.guest.max;
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
    },
};
</script>
