<template>
    <q-modal maximized v-model="opened">

    </q-modal>
</template>

<style>

</style>

<script>
export default {
    name: 'supply-modal',
    props: ['show'],
    data() {
        return {
            zsubscriptions: ['org/egan']
        };
    },
    computed: {
    },
    created() {},
    mounted() {
        console.log("this is rendered")
    },
    methods: {
    },
};
</script>
