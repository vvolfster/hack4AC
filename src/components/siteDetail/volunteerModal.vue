<template>
  <q-modal id="root"
           v-if="modalIsVisible"
           :value="modalIsVisible"
           @close="hideModal"
           >
    <div class="q-pa-lg column">
      <h4 class="flow column text-center">{{site.title}}</h4>
      <div class="q-pa-lg">
        <quick-number label="Volunteer Count"
                      class="quickNum"
                      v-model="volunteerCount"></quick-number>
      </div>
      <div class="q-pa-lg">
        <quick-number label="Hours Volunteered"
                      class="quickNum"
                      v-model="volunteeredHours"></quick-number>
      </div>
      <q-btn color="secondary q-ma-sm"
             @click="submit"
             label="Submit" />
      <q-btn color="primary q-ma-sm"
             @click="hideModal"
             label="Close" />
    </div>

  </q-modal>
</template>

<script>
import quickNumber from '../quickNumber';

import { user } from '../../storeWriter'

export default {
    name: 'volunteerModal',
    components: {
        quickNumber,
    },
    props: ['site', 'volunteerModalIsVisible', 'hideVolunteerModal'],
    data() {
        return {
            volunteerCount: 0,
            volunteeredHours: 0,
        };
    },
    computed: {
        modalIsVisible() {
            return this.volunteerModalIsVisible
        },
    },
    created() {},
    mounted() {},
    methods: {
        submit() {
            console.log("sending data:", this.volunteerCount, this.volunteeredHours, this.site.id)
            user.countVolunteers(this.volunteerCount || 0, this.volunteeredHours || 0, this.site.id)
        },
        hideModal() {
            this.hideVolunteerModal()
        },
    },
};
</script>

<style scoped>
h4 {
    margin-top: 0;
}
</style>
