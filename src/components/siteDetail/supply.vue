<template>
  <div id="root" class="q-pa-sm">
    <q-btn @click="$router.replace('/supplydetail/' + siteId)">
        Supplies
    </q-btn>
  </div>
</template>

<script>
export default {
    name: "supplies",
    components: {},
    props: ["siteId"],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>

<style scoped>
</style>
