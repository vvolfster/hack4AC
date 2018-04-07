<template>
  <div>
    <q-item @click.native="clickEmit(site)">
      <q-item-side>
        <!-- ICONS showing pet friendly etc -->
        <q-item-tile v-if="isAccessible"
                     icon="accessible"
                     color="green" />
      </q-item-side>
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
  </div>
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
        isAccessible() {
            return this.site.supports.ADA;
        },
    }
};
</script>

<style scoped>
/* css for this here */
</style>
