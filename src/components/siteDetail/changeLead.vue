<template>
    <div id="root" class="q-pa-md">
        <q-btn :value="checkIfCurrentUserIsOnSite" color="primary"
                @clicked="() => takeLead()"
                :label="'Take ' + role" />
    </div>
</template>

<script>
import { user } from '../../storeWriter'

export default {
    name: 'changeLead',
    components: {},
    props: ['siteId', 'role', 'roleId'],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        takeLead() {
            user.toggleLead(this.roleId, this.siteId)
        }
    },
};
</script>

<style scoped>

</style>
