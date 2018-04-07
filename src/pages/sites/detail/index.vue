<template>
  <q-page class="flex flex-center">
      option contains:
        suppliesNeeded
        incidents
        userCard
        <pre>
          {{ site }}
        </pre>
        yoyo
  </q-page>
</template>

<script>
export default {
    name: 'PageIndex',
    // components: {

    // },
    props: [""],
    data() {
        return {
            zsubscriptions: ["org/egan"],
            id: "a"
        };
    },
    computed: {
        site() {
            try{
                return this.zsubData['org/egan'].site[this.id];
            }catch(e){
                console.error('failed', e)
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
        getPercent(site) {
            const x = site.guest.current / site.guest.max
            return x * 100;
        },
        clickSite(site) {
            console.log("clicked site", site);
        }
    }
};
</script>

<style scoped>

</style>
