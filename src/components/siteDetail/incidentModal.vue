<template>
  <q-modal id="root"
           v-if="incidentModalIsVisible"
           v-model="incidentModalIsVisible">
    <div class="q-pa-lg column">
      <h4 class="flow column text-center">Report Incidient</h4>
      <div class="q-pb-lg">
          <phone-contact role="Emergency" :contact="{phone: '911', firstName: null}" omitFirstName></phone-contact>
          <phone-contact role="CAHOOTS" :contact="{phone: '5416825111', firstName: null}" omitFirstName></phone-contact>
          <phone-contact role="Admin" :contact="{phone: '5411234567', firstName: null}" omitFirstName></phone-contact>
      </div>
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
