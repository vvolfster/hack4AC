<template>
    <div>
        <!-- OLD BAR -->
        <div id="root"
             class="row q-pa-sm"
             v-if="isPetFriendly && renderType === 'default'">
            <q-item-tile class="col-1 flex flex-center">
                <q-item-tile icon="fas fa-paw"
                             color="green" />
            </q-item-tile>
            <q-item-tile class="col-6 flex flex-center">
                <q-progress :percentage="getPercentPets(site)"
                            style="height: 15px" />
            </q-item-tile>
            <q-item-tile class="update col-2 q-ml-sm">
                <div col="row">
                    <span>{{ site.pets.current }}/{{ site.pets.max }}</span>
                </div>
            </q-item-tile>
            <q-item-tile class="col-3 q-ml-sm">
                <small>({{ moment(site.pets.lastUpdated).fromNow() }})</small>
                <q-item-tile v-if="countNeedsUpdated && !hideExtraInfo"
                             icon="alarm"
                             color="red" />
            </q-item-tile>
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
    props: ['site', 'type', 'hideExtraInfo'],
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
