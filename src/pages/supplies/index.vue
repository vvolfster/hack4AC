<template>
    <q-page class="page">
        <q-list highlight class="sitetable">
            <q-list-header>Sites</q-list-header>
            <site-card-supply v-for="(s, key) in sites"
                              :site="s"
                              :key="key"
                              @siteClicked="clickSite" />
        </q-list>
    </q-page>
</template>

<style>

</style>

<script>
// import lodash from "lodash";
// import moment from "moment";
import siteCardSupply from '../../components/siteCardSupply';

export default {
    name: 'Dispatch',
    components: {
        siteCardSupply,
    },
    props: [''],
    data() {
        return {
            zsubscriptions: ['org/egan'],
        };
    },
    computed: {
        sites() {
            try {
                console.log(this.zsubData['org/egan'].site);
                return this.zsubData['org/egan'].site;
            } catch (e) {
                return {};
            }
        },
    },
    created() {},
    mounted() {},
    methods: {
        clickSite(site) {
            console.log('clicked site', site);
        },
    },
};
</script>
