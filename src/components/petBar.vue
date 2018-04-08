<template>
  <div id="root"
       class="row q-pa-sm"
       v-if="isPetFriendly">
    <q-item-tile class="col-3 flex flex-center">
      <q-item-tile icon="fas fa-paw"
                   color="green" />
    </q-item-tile>
    <q-progress class="col-5 q-mr-sm"
                :percentage="getPercentPets(site)"
                style="height: 15px" />{{ moment(site.pets.lastUpdated).fromNow() }}
  </div>
</template>

<script>
export default {
    name: "petBar",
    components: {},
    props: ["site"],
    data() {
        return {};
    },
    computed: {
        isPetFriendly() {
            if (!this.site.supports) {
                return false;
            }
            return this.site.supports.pets;
        }
    },
    created() {},
    mounted() {},
    methods: {
        getPercentPets(site) {
            const x = site.pets.current / site.pets.max;
            return x * 100;
        }
    }
};
</script>

<style scoped>

</style>
