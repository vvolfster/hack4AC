<template>
  <q-modal id="root"
           v-if="modalIsVisible"
           v-model="modalIsVisible"
           @close="hideModal">
    <div class="q-pa-lg column">
      <h4 class="flow column text-center">{{site.title}}</h4>
      <div class="q-pa-lg">
        <people-bar :site=site :hideExtraInfo=true></people-bar>
        <quick-number label="Arrived"
                      class="quickNum"
                      :value="site.guest.inTransit"
                      v-on:input="changeArrived"></quick-number>
      </div>
      <div class="q-pa-lg">
        <pet-bar :site=site :hideExtraInfo=true></pet-bar>
        <quick-number label="Arrived"
                      class="quickNum"
                      :value="site.guest.inTransit"
                      v-on:input="changeArrived"></quick-number>
      </div>
      <q-btn color="secondary q-ma-sm"
             @click="hideModal"
             label="Submit" />
      <q-btn color="primary q-ma-sm"
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
    data() {
        return {};
    },
    computed: {
        modalIsVisible() {
            console.log(this.intakeModalIsVisible)
            return this.intakeModalIsVisible
        },
    },
    created() {},
    mounted() {},
    methods: {
        changeArrived() {

        },
        hideModal() {
            console.log("log")
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
