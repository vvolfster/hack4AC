<template>
  <q-page class="flex flex-center">
    <q-list highlight>
      <q-list-header>Sites</q-list-header>
      <q-item v-for="(s, id) in site"
              :key="id">
        <q-item-side>
        </q-item-side>
        <q-item-main :label="s.title">
          <q-progress :percentage="getPercent(s)"
                      style="height: 4px" />
        </q-item-main>
        <q-item-side right>
                       <q-item-tile icon="shopping cart"
                       color="green" />
                       {{s.suppliesNeeded.length}}
        </q-item-side>
      </q-item>
    </q-list>
  </q-page>
</template>

<style>

</style>

<script>
// import lodash from "lodash";
// import moment from "moment";

export default {
    name: "supplies",
    components: {},
    props: [""],
    data() {
        return {
            zsubscriptions: ["org/egan"]
        };
    },
    computed: {
        sites() {
            try{
                return this.zsubData['org/egan'].site;
            }catch(e){
                return {}
            }
        }
    },
    created() {},
    mounted() {
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
};
</script>
