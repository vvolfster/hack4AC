<template>
  <!-- main dashboard -->
    <q-page class="flex">
        <q-list highlight>
            <div v-for="(s, key) in sites" :key="key" v-if="s.active">
                <div @click="$router.push('/detail/' + key)">
                    <site-card :site="s" />
                </div>
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
    }
};
</script>
