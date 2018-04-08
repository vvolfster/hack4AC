<template>
  <q-page>

    <div class="subcontrol flex justify-between q-pa-sm">
      <div>
        <q-btn v-if="!checkIfCurrentUserIsOnSite"
               @click="$router.replace('/sites')">
          Back to sites
        </q-btn>
      </div>
      <div>
        <q-toggle v-if="site.active"
                  :value="checkIfCurrentUserIsOnSite"
                  @input="() => toggleOnSite()"
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
        <div class="flex flex-center">
          <intake :siteId=siteId></intake>
        </div>

        <div class="flex flex-center q-pa-lg">
          <q-btn @click="$router.replace('/supplydetail/' + siteId)">
            Request Supplies
          </q-btn>
        </div>

        <div class="flex flex-center">
          <incident :siteId=siteId></incident>
        </div>

        <div class="flex flex-center column">
          <h4>Change Lead</h4>
          <changeLead role="site lead"
                      :siteId=siteId></changeLead>
          <changeLead role="shift lead"
                      :siteId=siteId></changeLead>
        </div>
      </div>
    </div>

    <pre>
            option contains: suppliesNeeded incidents userCard
        </pre>
    <pre>
            {{ site }}
        </pre>
  </q-page>
</template>

<script>
import peopleBar from '../../../components/peopleBar';
import petBar from '../../../components/petBar';
import phoneContact from '../../../components/phoneContact';
import supply from '../../../components/siteDetail/supply';
import changeLead from '../../../components/siteDetail/changeLead';

export default {
    name: 'PageIndex',
    components: {
        peopleBar,
        petBar,
        phoneContact,
        supply,
        changeLead,
    },
    props: [''],
    data() {
        return {
            zsubscriptions: ['org/egan'],
            siteId: this.$route.params.siteId,
            currentUserIsOnSite: true, // null, // starts with special value null, so that the data from the server takes precedence over the state of the UI or vice versa when necessary
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
        checkIfCurrentUserIsOnSite() {
            if (!this.site.active) {
                return false;
            }

            if (this.currentUserIsOnSite) {
                return true;
            }

            // TODO/FIXME: This will probably be checked differently once the data model of the database will be created

            return false;
        },
    },
    created() {},
    mounted() {},
    methods: {
        toggleOnSite() {
            this.currentUserIsOnSite = !this.currentUserIsOnSite;
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
</style>
