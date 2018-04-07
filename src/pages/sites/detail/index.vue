<template>
  <q-page>
        <div>
            <phone-contact role="Site Lead" :contact=site.siteLead></phone-contact>
            <phone-contact role="Shift Lead" :contact=site.shiftLead></phone-contact>
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

export default {
    name: "PageIndex",
    components: {
        phoneContact
    },
    props: [""],
    data() {
        return {
            zsubscriptions: ["org/egan"],
            id: "a"
        };
    },
    computed: {
        site() {
            try {
                return this.zsubData["org/egan"].site[this.id];
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
