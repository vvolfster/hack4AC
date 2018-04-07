<template>
  <div>
    <q-item @click.native="clickEmit(site)">
      <q-item-side>
        <!-- ICONS showing pet friendly etc -->
        <q-item-tile v-if="isAccessible"
                     icon="accessible"
                     color="green" />
        <q-item-tile v-if="isPetFriendly"
                     icon="fas fa-paw"
                     color="green" />
      </q-item-side>
      <q-item-main :label="site.title">
        <div class="column">
          <div class="row">
            <q-item-tile v-if="isChildFriendly"
                         class="col-3"
                         icon="fas fa-child"
                         color="green" />
            <q-item-tile class="col-3"
                         v-if="isAdultFriendly"
                         icon="fas fa-male"
                         color="green" />
            <q-progress class="col-6"
                        :percentage="getPercent(site)"
                        style="height: 15px" /> {{ moment(site.guest.lastUpdated).fromNow() }}
            <div class="col-3">{{ site.guest.current }}/{{ site.guest.max }}</div>
            <q-item-tile v-if="countNeedsUpdated"
                         icon="alarm"
                         color="red" />
          </div>
        </div>

      </q-item-main>
      <q-item-side right>
        <q-item-tile icon="directions car"
                     color="green" /> {{ site.suppliesNeeded.length }}
      </q-item-side>
      <q-item-separator />
    </q-item>
  </div>
</template>

<script>
// import moment from "moment"

export default {
    name: "",
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
        isAccessible() {
            return this.site.supports.ADA;
        },
        isPetFriendly() {
            return this.site.supports.pets;
        },
        isAdultFriendly() {
            return this.site.supports.ageGroup === "adult";
        },
        isChildFriendly() {
            return this.site.supports.ageGroup === "child";
        }
    },
    created() {},
    mounted() {
        console.log("site", this.site);
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
        clickEmit() {
            this.$emit("siteClicked", this.site);
        }
    }
};
</script>

<style scoped>
/* css for this here */
</style>
