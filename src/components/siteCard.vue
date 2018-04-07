<template>
  <div>
      <q-item @click.native="clickSite(site)">
        <q-item-side>
        </q-item-side>
        <q-item-main :label="site.title">
            <div>
                <q-progress :percentage="getPercent(site)"
                      style="height: 15px" />
                      {{moment(site.guest.lastUpdated).fromNow()}}
                      <q-item-tile v-if="countNeedsUpdated" icon="alarm"
                       color="red" />
            </div>

        </q-item-main>
        <q-item-side right>
          <q-item-tile icon="person"
                       color="green" /> {{site.guest.current}}/{{site.guest.max}}
          <q-item-tile icon="directions car"
                       color="green" /> {{site.suppliesNeeded.length}}
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
        return {
        };
    },
    computed: {
        countNeedsUpdated(){
            const now = +new Date()
            const thirtyMinutes = 30 * 60 * 1000
            return this.site.guest.lastUpdated + thirtyMinutes < now
        }
    },
    created() {},
    mounted() {
        console.log("site", this.site)
    // const self = this;
    // this.$nextTick(() => {
    //     try {
    //     } catch (e) {
    //         //
    //     }
    // });
    },
    methods: {
        getPercent(site){
            const x = site.guest.current / site.guest.max
            return x * 100
        },
    }
}
</script>

<style scoped>
    /* css for this here */
</style>
