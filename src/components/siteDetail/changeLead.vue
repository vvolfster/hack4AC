<template>
    <div id="root" class="q-pa-md">
        <q-btn :value="checkIfCurrentUserIsOnSite" color="primary"
                @clicked="() => takeLead()"
                :label="'Take ' + role" />
    </div>
</template>

<script>
export default {
    name: 'changeLead',
    components: {},
    props: ['role'],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        takeLead() {
            // TODO/FIXME: add server request to change lead

        }
    },
};
</script>

<style scoped>

</style>
