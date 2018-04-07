<template>
  <div>
      <q-item @click.native="clickSite(site)">
        <q-item-side>
        </q-item-side>
        <q-item-main :label="site.title">
            <div>
                <q-progress :percentage="getPercent(site)"
                      style="height: 4px" />
                {{moment(site.guest.lastUpdated).fromNow()}}
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
export default {
    name: "",
    components: {},
    props: ["site"],
    data() {
        return {
        };
    },
    computed: {

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
            return (site.guest.current / site.guest.max) * 100
        },
    }
}
</script>

<style scoped>
    /* css for this here */
</style>
