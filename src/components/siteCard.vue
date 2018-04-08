<template>
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
            <div class="column">
                <people-bar :site=site></people-bar>
                <pet-bar :site=site></pet-bar>
                <!-- IN TRANSIT -->
                <div class="row q-pa-sm">
                    <span class="col-3">In Transit</span>
                    <div class="col-2">
                        <q-icon name="fas fa-male"></q-icon>
                        {{site.guest.inTransit}}
                    </div>
                    <div class="col-2">
                        <q-icon name="fas fa-paw"></q-icon>
                        {{site.pets.inTransit}}
                    </div>
                </div>
            </div>
        </q-card>
    </q-item>
</template>

<script>
// import moment from "moment"
import peopleBar from './peopleBar';
import petBar from './petBar';

export default {
    name: '',
    components: { peopleBar, petBar },
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
        isAccessible() {
            return this.site.supports.ADA;
        },
        isPetFriendly() {
            return this.site.supports.pets;
        },
        isAdultFriendly() {
            return this.site.supports.ageGroup === 'adult';
        },
        isChildFriendly() {
            return this.site.supports.ageGroup === 'child';
        },
    },
    created() {},
    mounted() {
        // console.log('site', this.site);
        // const self = this;
        // this.$nextTick(() => {
        //     try {
        //     } catch (e) {
        //         //
        //     }
        // });
    },
    methods: {
        clickEmit() {
            this.$emit('siteClicked', this.site);
        },
    },
};
</script>

<style scoped>
.site--card {
    width: 100%;
}
</style>
