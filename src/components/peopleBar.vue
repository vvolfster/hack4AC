<template>
  <div id="root"
       class="row q-pa-sm">
    <q-item-tile class="col-3 flex flex-center">
      <q-item-tile v-if="isChildFriendly"
            icon="fas fa-child"
            color="green" />
      <q-item-tile v-if="isAdultFriendly"
            icon="fas fa-male"
            color="green" />
      <q-item-tile v-if="isAccessible"
            icon="accessible"
            color="green" />
    </q-item-tile>
    <q-progress class="col-5 q-mr-sm"
                :percentage="getPercentPeople(site)"
                style="height: 15px" /> {{ moment(site.guest.lastUpdated).fromNow() }}
    <div class="col-2">{{ site.guest.current }}/{{ site.guest.max }}</div>
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
                return false;
            }
            return this.site.supports.ageGroup === "adult";
        },
        isChildFriendly() {
            if (!this.site.supports) {
                return false;
            }
            return this.site.supports.ageGroup === "child";
        },
        isAccessible() {
            if (!this.site.supports) {
                return false;
            }
            return this.site.supports.ADA;
        }
    },
    created() {},
    mounted() {},
    methods: {
        getPercentPeople(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        }
    }
};
</script>

<style scoped>

</style>
