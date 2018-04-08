<template>
  <q-page>

    <div class="subcontrol flex justify-between q-pa-sm">
      <div>
        <q-btn v-if="!orgUserData.onSite"
               @click="$router.replace('/sites')">
          Back to sites
        </q-btn>
      </div>
      <div>
        <q-toggle v-if="site.active"
                  :value="orgUserData.onSite === siteId"
                  @click="toggleOnSite"
                  label="I'm on site" />
      </div>
    </div>

    <div v-if="!site.active">
      <h3 class="text-center">Loading...</h3>
    </div>

    <div v-else>
      <h3 class="text-center">{{ site.title }}</h3>

      <div>
        <people-bar :site=site></people-bar>
        <pet-bar :site=site></pet-bar>
      </div>

      <div>
        <div v-if="!site.siteLead"
             class="link flex flex-center q-pa-sm">
          There is currently no site lead for this site
        </div>
        <phone-contact v-else
                       role="Site Lead"
                       :contact=site.siteLead></phone-contact>

        <div v-if="!site.shiftLead"
             class="link flex flex-center q-pa-sm">
          There is currently no shift lead for this site
        </div>
        <phone-contact v-else
                       role="Shift Lead"
                       :contact=site.shiftLead></phone-contact>
      </div>

      <!-- show detailed supply requested list -->
      <div v-if="!currentUserIsOnSite">
        <supply readOnly=true
                :suppliesNeeded=site.suppliesNeeded></supply>
      </div>

      <!-- show full extent of functionalities, but do not show details of supply requests -->
      <div v-if="currentUserIsOnSite">
        <div class="flex flex-center q-pa-lg">
          <q-btn @click="showIntakeModal" color="primary" class="q-ma-sm">
            Add / Remove Guests
          </q-btn>
          <q-btn @click="$router.push('/supplydetail/' + siteId)" color="primary" class="q-ma-sm">
            Request Supplies
          </q-btn>
        </div>

        <div class="flex flex-center column">
            <h4>Incidents</h4>
            <div class="flex flex-center q-pa-lg">
                <q-btn @click="clearIncident" color="secondary" class="q-ma-sm">
                    Clear Incident
                </q-btn>
                <q-btn @click="showIncidentModal" color="primary" class="q-ma-sm">
                    Report Incident
                </q-btn>
            </div>
        </div>

        <div class="flex flex-center column">
          <h4>Change Lead</h4>
          <div class="flex flex-center">
            <changeLead role="site lead" roleId="siteLead"
                        :siteId=siteId></changeLead>
            <changeLead role="shift lead" roleId="shiftLead"
                        :siteId=siteId></changeLead>
        </div>
        </div>
      </div>
    </div>
    <intake-modal :intakeModalIsVisible=intakeModalIsVisible :site=site :hideIntakeModal=hideIntakeModal></intake-modal>
    <incident-modal :incidentModalIsVisible=incidentModalIsVisible :site=site :hideIncidentModal=hideIncidentModal></incident-modal>
  </q-page>
</template>

<script>
import peopleBar from '../../../components/peopleBar';
import petBar from '../../../components/petBar';
import phoneContact from '../../../components/phoneContact';
import intakeModal from '../../../components/siteDetail/intakeModal';
import supply from '../../../components/siteDetail/supply';
import incidentModal from '../../../components/siteDetail/incidentModal';
import changeLead from '../../../components/siteDetail/changeLead';

import { user } from '../../../storeWriter'

export default {
    name: 'PageIndex',
    components: {
        peopleBar,
        petBar,
        phoneContact,
        intakeModal,
        supply,
        incidentModal,
        changeLead,
    },
    props: [''],
    data() {
        return {
            zsubscriptions: ['org/egan'],
            siteId: this.$route.params.siteId,
            intakeModalIsVisible: false,
            incidentModalIsVisible: false,
        };
    },
    computed: {
        site() {
            try {
                return this.zsubData['org/egan'].site[this.siteId];
            } catch (e) {
                return {};
            }
        },
    },
    created() {},
    mounted() {},
    methods: {
        toggleOnSite() {
            user.toggleUserOnSite(this.siteId)
        },
        showIntakeModal() {
            this.intakeModalIsVisible = true;
            return true
        },
        hideIntakeModal() {
            this.intakeModalIsVisible = false;
            return false
        },
        showIncidentModal() {
            this.incidentModalIsVisible = true;
            return true
        },
        hideIncidentModal() {
            this.incidentModalIsVisible = false;
            return false
        },
        clearIncident() {
            // TODO
        }
    },
};
</script>

<style scoped>
.subcontrol {
    min-height: 55px;
}
h4 {
    margin-bottom: 0;
}
</style>
