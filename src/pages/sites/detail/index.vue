<template>
    <q-page>

        <div class="subcontrol flex justify-between q-pa-sm">
            <div>
                <q-btn v-if="orgUserData && (orgUserData.onSite === siteId)"
                       @click="returnToSite">
                    Back to Site List
                </q-btn>
            </div>
            <div>
                <q-toggle v-if="site.active"
                          :value="orgUserData && orgUserData.onSite === siteId ? true : false"

                          @input="toggleOnSite"
                          label="I'm on site" />
            </div>
        </div>

        <div v-if="!site.active">
            <h3 class="text-center">Loading...</h3>
        </div>

        <div v-else>
            <q-card>
                <q-card-title>
                    {{ site.title }}
                    <span slot="subtitle">{{site.streetAddress}}</span>
                    <div slot="right"
                         class="row items-center">
                        <!-- badges -->
                        <q-item-tile v-if="isAccessible"
                                     icon="accessible"
                                     color="green" />
                    </div>
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                    <people-bar :site=site></people-bar>
                    <pet-bar :site=site></pet-bar>
                    <!-- IN TRANSIT -->
                    <div class="row q-pa-sm">
                        <span class="col-3">In Transit</span>
                        <div class="col-2">
                            <q-icon name="fas fa-male"></q-icon>
                            {{site.guest.inTransit}}
                        </div>
                        <div class="col-2">
                            <q-icon name="fas fa-paw"></q-icon>
                            {{site.pets.inTransit}}
                        </div>
                    </div>
                </q-card-main>
                <q-card-actions>
                    <phone-contact role="Site Lead"
                                   :contact=site.siteLead
                                   small='true'></phone-contact>
                    <phone-contact role="Shift Lead"
                                   :contact=site.shiftLead
                                   small='true'></phone-contact>
                </q-card-actions>
            </q-card>

            <div>
                <div v-if="!site.siteLead"
                     class="link flex flex-center q-pa-sm">
                    There is currently no site lead for this site
                </div>

                <div v-if="!site.shiftLead"
                     class="link flex flex-center q-pa-sm">
                    There is currently no shift lead for this site
                </div>
            </div>

            <!-- show detailed supply requested list -->
            <div v-if="showHeader">
                <supply readOnly=true
                        :suppliesNeeded=fulfilledSuppliesNeeded></supply>
            </div>

                <q-collapsible icon="person"
                               label="Change Lead">
                    <div>
                        <div class="flex flex-center column">
                            <div class="flex flex-center">
                                <changeLead role="site lead"
                                            roleId="siteLead"
                                            :siteId=siteId></changeLead>
                                <changeLead role="shift lead"
                                            roleId="shiftLead"
                                            :siteId=siteId></changeLead>
                            </div>
                        </div>
                    </div>
                </q-collapsible>
            <!-- show full extent of functionalities, but do not show details of supply requests -->
            <div v-if="orgUserData && orgUserData.onSite === siteId">
                <div class="flex flex-center column">
                    <big>Incidents</big>
                    <div class="flex flex-center q-pa-sm">
                        <q-btn v-if="ongoingIncident"
                               @click="clearIncident"
                               color="secondary"
                               class="q-ma-sm">
                            Clear Incident
                        </q-btn>
                        <q-btn @click="showIncidentModal"
                               color="primary"
                               class="q-ma-sm">
                            Report Incident
                        </q-btn>
                    </div>
                </div>


                <div class="flex flex-center q-pa-md">
                    <q-btn @click="showIntakeModal"
                           color="primary"
                           size="md"
                           class="q-ma-sm">
                        Update Guest Count
                    </q-btn>
                    <q-btn @click="$router.push('/supplydetail/' + siteId)"
                           color="primary"
                           size="md"
                           class="q-ma-sm">
                        Request Supplies
                    </q-btn>
                </div>

                <!-- <div class="flex flex-center column">
                    <h4>Volunteers</h4>
                    <div class="flex flex-center">
                        <q-btn @click="showVolunteerModal"
                               color="primary"
                               class="q-ma-sm">
                            Count Volunteers
                        </q-btn>
                    </div>
                </div> -->

            </div>
        </div>
        <intake-modal :intakeModalIsVisible=intakeModalIsVisible
                      :site=site
                      :hideIntakeModal=hideIntakeModal></intake-modal>
        <incident-modal :incidentModalIsVisible=incidentModalIsVisible
                        :site=site
                        :hideIncidentModal=hideIncidentModal></incident-modal>
        <volunteer-modal :volunteerModalIsVisible=volunteerModalIsVisible
                         :site=site
                         :hideVolunteerModal=hideVolunteerModal></volunteer-modal>
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
import volunteerModal from '../../../components/siteDetail/volunteerModal';
import lodash from 'lodash';

import { user, site as siteWriter } from '../../../storeWriter';

export default {
    name: 'SiteDetail',
    components: {
        peopleBar,
        petBar,
        phoneContact,
        intakeModal,
        supply,
        incidentModal,
        changeLead,
        volunteerModal,
    },
    props: [''],
    data() {
        return {
            zsubscriptions: ['org/egan'],
            siteId: this.$route.params.siteId,
            intakeModalIsVisible: false,
            incidentModalIsVisible: false,
            volunteerModalIsVisible: false,
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
        showHeader() {
            if (!this.orgUserData || this.orgUserData.onSite !== this.siteId) {
                // show Header
                this.$root.$emit('showHeader');
                return true;
            }
            // hide header
            this.$root.$emit('hideHeader');
            return false;
        },
        ongoingIncident() {
            return !!this.site.incidents;
        },
        fulfilledSuppliesNeeded() {
            const derp1 = lodash.map(this.site.suppliesNeeded, (e, id) => {
                e.id = id;
                return e;
            });
            return lodash.filter(derp1, e => {
                return e.fulfilled === false;
            });
        },
    },
    created() {},
    mounted() {},
    methods: {
        isAccessible() {
            return this.site.supports.ADA;
        },
        toggleOnSite() {
            user.toggleUserOnSite(this.site.id);
        },
        returnToSite() {
            this.$router.push('/sites');
            this.$root.$emit('showHeader');
        },
        showIntakeModal() {
            this.intakeModalIsVisible = true;
            return true;
        },
        hideIntakeModal() {
            this.intakeModalIsVisible = false;
            return false;
        },
        showIncidentModal() {
            this.incidentModalIsVisible = true;
            return true;
        },
        hideIncidentModal() {
            this.incidentModalIsVisible = false;
            return false;
        },
        showVolunteerModal() {
            this.volunteerModalIsVisible = true;
            return true;
        },
        hideVolunteerModal() {
            this.volunteerModalIsVisible = false;
            return false;
        },
        clearIncident() {
            siteWriter.clearAllIncidents(this.site.id);
        },
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
.stats {
    max-width: 700px;
    margin: auto;
}
</style>
