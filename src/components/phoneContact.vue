<template>
  <div id="root" class="flex flex-center">
    <div><q-icon name="phone" /></div>
    <div>{{ role }}:</div>
    <div>{{ contact.firstName }}</div>
    <div>-</div>
    <div>{{ contact.phone }}</div>
  </div>
</template>

<script>

export default {
    name: "phoneContact",
    components: {},
    props: ["role", "contact"],
    data() {
        return {};
    },
    computed: {},
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
    }
};
</script>

<style scoped>
    #root div {
        margin-left: 5px;
    }
</style>
