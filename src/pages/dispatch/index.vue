/* eslint-disable */
<template>
  <q-page class="flex">
    <q-list highlight>
      <q-list-header>Sites</q-list-header>
        <site-card v-for="(s, key) in sites" :site="s" :key="key" v-on:siteClicked="clickSite"></site-card>
    </q-list>
  </q-page>
</template>

<style>

</style>

<script>
// import lodash from "lodash";
// import moment from "moment";

export default {
    name: "dispatch",
    components: {
        siteCard
    },
    props: [""],
    data() {
        return {
            zsubscriptions: ["org/egan"]
        };
    },

    computed: {
        sites() {
            try{
                return this.zsubData['org/egan'].site;
            }catch(e){
                return {}
            }
        }
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
            const x = site.guest.current / site.guest.max
            return x * 100;
        },
        clickSite(site) {
            console.log("clicked site", site);
        }
    }
};
</script>
