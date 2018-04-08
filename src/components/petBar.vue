<template>
    <div>
        <!-- OLD BAR -->
        <div id="root"
             class="row q-pa-sm"
             v-if="isPetFriendly && renderType === 'default'">
            <q-item-tile class="col-1 flex-center">
                <q-item-tile icon="fas fa-paw"
                             color="green" />
            </q-item-tile>
            <q-progress class="col-5 q-mr-sm"
                        :percentage="getPercentPets(site)"
                        style="height: 15px" />
            <q-item-tile class="update col-3 q-ml-sm">
                <span>{{ site.pets.current }}/{{ site.pets.max }}</span>
                <small>({{ moment(site.pets.lastUpdated).fromNow() }})</small>
            </q-item-tile>
            <q-item-tile v-if="countNeedsUpdated"
                         icon="alarm"
                         color="red" />
        </div>
        <!-- NEW BAR -->
        <div v-if="renderType===''">

        </div>
    </div>

</template>

<script>
export default {
    name: 'petBar',
    components: {},
    props: ['site', 'type'],
    data() {
        return {
            renderType: 'default',
        };
    },
    computed: {
        isPetFriendly() {
            if (!this.site.supports) {
                return false;
            }
            return this.site.supports.pets;
        },
    },
    created() {},
    mounted() {
        if (this.type) {
            this.renderType = this.type;
        }
    },
    methods: {
        countNeedsUpdated() {
            const now = +new Date();
            const thirtyMinutes = 30 * 60 * 1000;
            return this.site.pets.lastUpdated + thirtyMinutes < now;
        },
        getPercentPets(site) {
            const x = site.pets.current / site.pets.max;
            return x * 100;
        },
    },
};
</script>

<style scoped>

</style>
