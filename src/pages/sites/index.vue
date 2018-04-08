<template>
    <!-- main dashboard -->
    <q-page class="main--page">
        <q-list class="main--list">
            <div v-for="(s, key) in sites"
                 :key="key"
                 v-if="s.active"
                 @click="$router.push('/detail/' + key)">
                <site-card :site="s" />
            </div>
        </q-list>
    </q-page>
</template>

<style scoped>
.main--page {
    /* width: 100%; */
}
.main--list {
    /* width: 100%; */
}
</style>

<script>
import siteCard from '../../components/siteCard';

export default {
    name: 'PageIndex',
    components: {
        siteCard,
    },
    data() {
        return {
            zsubscriptions: ['org/egan'],
        };
    },
    computed: {
        sites() {
            try {
                console.log('sub data', this.zsubData['org/egan']);
                return this.zsubData['org/egan'].site;
            } catch (e) {
                return {};
            }
        },
    },
    methods: {
        getPercent(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
    },
};
</script>
