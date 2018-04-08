<template>
  <q-modal id="root"
           v-if="modalIsVisible"
           :value="modalIsVisible"
           @close="hideModal"
           >
    <div class="q-pa-lg column">
      <h4 class="flow column text-center">{{site.title}}</h4>
      <div class="q-pa-lg">
        <people-bar :site=site :hideExtraInfo=true></people-bar>
        <quick-number label="Arrived"
                      class="quickNum"
                      v-model="guestsArrived"></quick-number>
      </div>
      <div class="q-pa-lg" v-if="site.supports.pets">
        <pet-bar :site=site :hideExtraInfo=true></pet-bar>
        <quick-number label="Arrived"
                      class="quickNum"
                      v-model="petsArrived"></quick-number>
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

import { user } from '../../storeWriter'

export default {
    name: 'changeLead',
    components: {
        peopleBar,
        petBar,
        quickNumber,
    },
    props: ['site', 'intakeModalIsVisible', 'hideIntakeModal'],
    data() {
        return {
            guestsArrived: 1,
            petsArrived: 0,
        };
    },
    computed: {
        modalIsVisible() {
            return this.intakeModalIsVisible
        },
    },
    created() {},
    mounted() {},
    methods: {
        hideModal() {
            this.hideIntakeModal()
        },
        submit() {
            console.log("sending data", this.guestsArrived, this.petsArrived)
            user.updateIntake(this.guestsArrived, this.petsArrived, this.site.id)
        }
    },
};
</script>

<style scoped>
h4 {
    margin-top: 0;
}
</style>
