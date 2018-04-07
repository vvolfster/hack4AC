<template>
  <div id="root" class="row col-12">
    <q-item-tile v-if="isChildFriendly"
                 class="col-3"
                 icon="fas fa-child"
                 color="green" />
    <q-item-tile class="col-3"
                 v-if="isAdultFriendly"
                 icon="fas fa-male"
                 color="green" />
    <q-item-tile class="col-3"
                 v-if="!isAdultFriendly && !isChildFriendly"/>
    <q-progress class="col-6"
                :percentage="getPercentPeople(site)"
                style="height: 15px" /> {{ moment(site.guest.lastUpdated).fromNow() }}
    <div class="col-3">{{ site.guest.current }}/{{ site.guest.max }}</div>
    <q-item-tile v-if="countNeedsUpdated"
                 icon="alarm"
                 color="red" />
  </div>
</template>

<script>
export default {
    name: "peopleBar",
    components: {},
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
        isAdultFriendly() {
            if (!this.site.supports) {
                return false
            }
            return this.site.supports.ageGroup === "adult";
        },
        isChildFriendly() {
            if (!this.site.supports) {
                return false
            }
            return this.site.supports.ageGroup === "child";
        }
    },
    created() {},
    mounted() {},
    methods: {
        getPercentPeople(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
    },
};
</script>

<style scoped>

</style>
