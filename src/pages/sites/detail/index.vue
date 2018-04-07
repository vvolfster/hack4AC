<template>
  <q-page>
        <div>
            <phone-contact role="Site Lead" :contact=site.siteLead></phone-contact>
            <phone-contact role="Shift Lead" :contact=site.shiftLead></phone-contact>
        </div>
        <div class="flex flex-center">
            <supply :siteId=siteId></supply>
        </div>

        <pre>
            option contains: suppliesNeeded incidents userCard
        </pre>
        <pre>
            {{ site }}
        </pre>
  </q-page>
</template>

<script>
import phoneContact from "../../../components/phoneContact";
import supply from "../../../components/siteDetail/supply";

export default {
    name: "PageIndex",
    components: {
        phoneContact,
        supply,
    },
    props: [""],
    data() {
        return {
            zsubscriptions: ["org/egan"],
            siteId: this.$route.params.siteId
        };
    },
    computed: {
        site() {
            try {
                return this.zsubData["org/egan"].site[this.siteId];
            } catch (e) {
                return {};
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
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
        clickSite(site) {
            console.log("clicked site", site);
        }
    }
};
</script>

<style scoped>

</style>
