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
    computed: {
        countNeedsUpdated() {
            const now = +new Date();
            const thirtyMinutes = 30 * 60 * 1000;
            return this.site.guest.lastUpdated + thirtyMinutes < now;
        },
        isAccessible() {
            return this.site.supports.ADA;
        },
        isPetFriendly() {
            return this.site.supports.pets;
        },
        isAdultFriendly() {
            return this.site.supports.ageGroup === 'adult';
        },
        isChildFriendly() {
            return this.site.supports.ageGroup === 'child';
        },
    },
    created() {},
    mounted() {
        console.log('site', this.site);
        // const self = this;
        // this.$nextTick(() => {
        //     try {
        //     } catch (e) {
        //         //
        //     }
        // });
    },
    methods: {
        clickEmit() {
            this.$emit('siteClicked', this.site);
        },
    },
};
</script>

<style scoped>
.site--card {
    width: 95%;
}
</style>
