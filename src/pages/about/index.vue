<template>
    <q-page>
        <div class="column flex flex-center">
            <big>Team Shrimp!</big>
            <span>with thanks to:</span>
            <span>Anam, Shahan, Greyson, Yves, Bharath, Shweta, Jason, Annie, Brett</span>
            <span>Hack for a Cause 2018</span>
            <span>Twenty Ideas</span>
            <span>Egan Warming Center (Shelley was amazing)</span>
            <span>hi*ball</span>
            <span>This project is MIT licensed so that you may freely learn and help others
                as we have</span>
        </div>

    </q-page>
</template>

<style scoped>

</style>

<script>
// import lodash from "lodash";
// import moment from "moment";
import siteCard from '../../components/siteCard';

export default {
    name: 'Dispatch',
    components: {
        siteCard,
    },
    props: [''],
    data() {
        return {
            zsubscriptions: ['org/egan'],
        };
    },

    computed: {
        sites() {
            try {
                return this.zsubData['org/egan'].site;
            } catch (e) {
                return {};
            }
        },
    },
    created() {},
    mounted() {},
    methods: {
        getPercent(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        }
    },
};
</script>
