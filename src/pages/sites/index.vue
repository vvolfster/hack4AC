<template>
  <!-- main dashboard -->
    <q-page class="flex">
        <q-list highlight>
            <div v-for="(s, key) in sites" :key="key" v-if="s.active">
                <site-card :site="s" @siteClicked="clickSite" />
            </div>
        </q-list>
    </q-page>
</template>

<style>
</style>

<script>
import siteCard from "../../components/siteCard";

export default {
    name: 'PageIndex',
    components: {
        siteCard
    },
    data() {
        return {
            zsubscriptions: ["org/egan"]
        };
    },
    computed: {
        sites() {
            try {
                console.log("sub data", this.zsubData["org/egan"]);
                return this.zsubData["org/egan"].site;
            } catch (e) {
                return {};
            }
        }
    },
    methods: {
        getPercent(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
        clickSite(site) {
            console.log("clicked site", site);
        }
    }
};
</script>
