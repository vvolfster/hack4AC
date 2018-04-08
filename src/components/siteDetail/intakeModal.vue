<template>
  <q-modal id="root"
           v-if="intakeModalIsVisible"
           v-model="intakeModalIsVisible">
    <div class="q-pa-lg column">
        <h4 class="flow column text-center">{{site.title}}</h4>
        <div class="q-pa-lg">
            <people-bar :site=site></people-bar>
            <quick-number label="Arrived"
                        class="quickNum"
                        :value="site.guest.inTransit"
                        v-on:input="changeInTransit"></quick-number>
        </div>
    </div>

  </q-modal>
</template>

<script>
import peopleBar from '../peopleBar';
import petBar from '../petBar';
import quickNumber from '../quickNumber';

export default {
    name: 'changeLead',
    components: {
        peopleBar,
        petBar,
        quickNumber,
    },
    props: ['site', 'intakeModalIsVisible'],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style scoped>
h4 {
    margin-top: 0;
}
</style>
