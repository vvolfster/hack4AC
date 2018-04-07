<template>
  <q-page>
        <h3 class="text-center">{{ site.title }}</h3>

        <div>
            <people-bar :site=site></people-bar>
            <pet-bar :site=site></pet-bar>
        </div>

        <div>
            <phone-contact role="Site Lead" :contact=site.siteLead></phone-contact>
            <phone-contact role="Shift Lead" :contact=site.shiftLead></phone-contact>
        </div>

       <div class="flex flex-center">
            <intake :siteId=siteId></intake>
        </div>

        <div class="flex flex-center">
            <supply :siteId=siteId></supply>
        </div>

        <div class="flex flex-center">
            <incident :siteId=siteId></incident>
        </div>

        <div class="flex flex-center">
            <changeSiteLead :siteId=siteId></changeSiteLead>
            <changeShiftLead :siteId=siteId></changeShiftLead>
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
import peopleBar from "../../../components/peopleBar";
import petBar from "../../../components/petBar";

export default {
    name: "PageIndex",
    components: {
        phoneContact,
        supply,
        peopleBar,
        petBar,
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
                console.log("sub data", this.zsubData["org/egan"]);
                return this.zsubData["org/egan"].site[this.siteId];
            } catch (e) {
                return {};
            }
        },
    },
    created() {},
    mounted() {},
    methods: {
        clickSite(site) {
            console.log("clicked site", site);
        }
    }
};
</script>

<style scoped>

</style>
