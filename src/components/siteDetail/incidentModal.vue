<template>
  <q-modal id="root"
           v-if="incidentModalIsVisible"
           v-model="incidentModalIsVisible">
    <div class="q-pa-lg column">
      <h4 class="flow column text-center">Report Incdient</h4>
      <div class="q-pa-lg">
          <phone-contact role="Emergency" phone="911" omitFirstName></phone-contact>
      </div>
      <q-btn color="secondary"
             class="q-ma-sm"
             @click="hideModal"
             label="Submit" />
      <q-btn color="primary"
             class="q-ma-sm"
             @click="hideModal"
             label="Close" />
    </div>

  </q-modal>
</template>

<script>
import phoneContact from '../phoneContact'

export default {
    name: 'changeLead',
    components: {
        phoneContact,
    },
    props: ['site', 'incidentModalIsVisible', 'hideIncidentModal'],
    data() {},
    computed: {
    },
    created() {},
    mounted() {},
    methods: {
        submitIncident() {

        },
        hideModal() {
            this.hideIncidentModal()
        },
    },
};
</script>

<style scoped>
h4 {
    margin-top: 0;
}
</style>
