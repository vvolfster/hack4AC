<template>
    <div id="root" class="q-pa-md">
        <q-toggle :value="checkIfCurrentUserIsOnSite"
                @input="() => toggleLead()"
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
        toggleLead() {
            // TODO/FIXME: add server request to change lead

        }
    },
};
</script>

<style scoped>

</style>
