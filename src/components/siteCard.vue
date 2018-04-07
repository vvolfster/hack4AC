<template>
  <q-page>
    <q-item @click.native="clickEmit(site)">
      <q-item-main :label="site.title">
        <div class="column">
            <people-bar :site=site></people-bar>
            <pet-bar :site=site></pet-bar>
            <div class="col-3">{{ site.guest.current }}/{{ site.guest.max }}</div>
        </div>

      </q-item-main>
      <q-item-side right>

      </q-item-side>
      <q-item-separator />
    </q-item>
  </q-page>
</template>

<script>
// import moment from "moment"
import peopleBar from "./peopleBar";
import petBar from "./petBar";

export default {
    name: "",
    components: { peopleBar, petBar },
    props: ["site"],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() { console.log(this.site) },
    methods: {
        clickEmit() {
            this.$emit("siteClicked", this.site);
        },
    }
};
</script>

<style scoped>
</style>
