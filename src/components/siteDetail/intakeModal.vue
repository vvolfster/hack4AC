<template>
  <q-modal id="root"
           v-if="intakeModalIsVisible"
           v-model="intakeModalIsVisible">
    <div class="q-pa-lg column">
      <h4 class="flow column text-center">{{site.title}}</h4>
      <div class="q-pa-lg">
        <people-bar :site=site :hideExtraInfo=true></people-bar>
        <quick-number label="Arrived"
                      class="quickNum"
                      :value="site.guest.inTransit"
                      v-on:input="changeArrived"></quick-number>
      </div>
      <q-btn color="primary"
             @click="hideModal"
             label="Close" />
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
    props: ['site', 'intakeModalIsVisible', 'hideIntakeModal'],
    data() {},
    computed: {
    },
    created() {},
    mounted() {},
    methods: {
        changeArrived() {

        },
        hideModal() {
            this.hideIntakeModal()
        },
    },
};
</script>

<style scoped>
h4 {
    margin-top: 0;
}
</style>
