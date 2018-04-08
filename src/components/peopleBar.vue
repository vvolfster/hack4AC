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

    <q-item-tile class="col-5 flex flex-center">
      <q-progress :percentage="getPercentPeople(site)"
                  style="height: 15px" />
    </q-item-tile>
    <q-item-tile
                 class="update col-3 q-ml-sm">
      <span>{{ site.guest.current }}/{{ site.guest.max }}</span>
      <span v-if="!hideExtraInfo">({{ moment(site.guest.lastUpdated).fromNow() }})</span>
    </q-item-tile>
    <q-item-tile v-if="countNeedsUpdated && !hideExtraInfo"
                 icon="alarm"
                 color="red" />
  </div>
</template>

<script>
export default {
    name: 'peopleBar',
    components: {},
    props: ['site', 'hideExtraInfo'],
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
            return this.site.supports.ageGroup === 'adult';
        },
        isChildFriendly() {
            if (!this.site.supports) {
                return false;
            }
            return this.site.supports.ageGroup === 'child';
        },
        isAccessible() {
            if (!this.site.supports) {
                return false;
            }
            return this.site.supports.ADA;
        },
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
.update {
    align-self: center;
}
</style>
