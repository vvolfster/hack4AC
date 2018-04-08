<template>
    <div>
        <q-item @click.native="clickEmit(site)">
            <q-card inline
                    class="site--card">
                <q-card-title>
                    <big>{{site.title}}</big>
                    <span slot="subtitle">{{site.streetAddress}}</span>
                    <div slot="right"
                         class="row items-center">
                        <!-- badges -->
                        <q-item-tile v-if="isAccessible"
                                     icon="accessible"
                                     color="green" />
                    </div>
                </q-card-title>
                <q-card-separator />
                <div class="column q-pa-sm">
                    {{site.suppliesNeeded.length}} Items requested
                </div>
                <q-card-actions>
                    <q-btn @click="$router.push(supplyDetailURL())"
                           icon="shopping cart"
                           label="See Cart"
                           color="green" />
                    <!-- {{site.suppliesNeeded.length}} -->
                </q-card-actions>
            </q-card>
        </q-item>
    </div>
</template>

<script>
// import moment from "moment"

export default {
    name: '',
    components: {},
    props: ['site'],
    data() {
        return {};
    },
    computed: {
        countNeedsUpdated() {
            const now = +new Date();
            const thirtyMinutes = 30 * 60 * 1000;
            return this.site.guest.lastUpdated + thirtyMinutes < now;
        },
    },
    created() {},
    mounted() {},
    methods: {
        getPercent(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
        clickEmit() {
            this.$emit('siteClicked', this.site);
        },
        supplyDetailURL() {
            return `/supplydetail/${this.site.id}`;
        },
    },
};
</script>

<style scoped>
/* css for this here */
.site--card {
    width: 100%;
}
</style>
