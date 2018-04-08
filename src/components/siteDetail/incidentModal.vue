<template>
    <q-modal id="root"
             v-if="incidentModalIsVisible"
             v-model="incidentModalIsVisible">
        <div class="q-pa-lg column">
            <h4 class="flow column text-center">Press To Call</h4>
            <div class="q-pb-lg"
                 @click="submitIncident">
                <phone-contact role="E 911"
                                flat='false'
                               :contact="{phone: '911111', firstName: null}"
                               @wasClicked="alertFrom911"
                               omitFirstName></phone-contact>
                <phone-contact role="CAHOOTS"
                                flat='false'
                               :contact="{phone: '5416825111', firstName: null}"
                               omitFirstName></phone-contact>
                <phone-contact role="Admin"
                                flat='false'
                               :contact="{phone: '5411234567', firstName: null}"
                               omitFirstName></phone-contact>
            </div>
            <q-btn color="primary"
                   class="q-ma-sm"
                   @click="hideModal"
                   label="Close" />
        </div>

    </q-modal>
</template>

<script>
import phoneContact from '../phoneContact';
import axios from 'axios';

import { site } from '../../storeWriter';

export default {
    name: 'changeLead',
    components: {
        phoneContact,
    },
    props: ['site', 'incidentModalIsVisible', 'hideIncidentModal'],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        alertFrom911() {
            axios.post('https://us-central1-warmingn-5dbc7.cloudfunctions.net/sendEmergencySMS', { to: '5415101550', siteName: `${this.site.title}` });
        },
        submitIncident() {
            site.reportIncident(this.site.id);
        },
        hideModal() {
            this.hideIncidentModal();
        },
    },
};
</script>

<style scoped>
h4 {
    margin-top: 0;
}
</style>
