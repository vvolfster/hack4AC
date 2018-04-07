<template>
  <q-page>

    <div class="flex justify-between q-pa-sm">
      <q-btn @click="$router.replace('/sites')">
        Back to sites
      </q-btn>
      <div>
        <q-toggle v-if="currentUserCanTakeControl"
                  v-model="currentUserIsInControl"
                  @input="() => toggleControl()"
                  :label="currentUserCanTakeControl" />
      </div>
    </div>

    <h3 class="text-center">{{ site.title }}</h3>

    <div>
      <people-bar :site=site></people-bar>
      <pet-bar :site=site></pet-bar>
    </div>

    <div>
      <phone-contact role="Site Lead"
                     :contact=site.siteLead></phone-contact>
      <phone-contact role="Shift Lead"
                     :contact=site.shiftLead></phone-contact>
    </div>

    <div class="flex flex-center">
      <intake :siteId=siteId></intake>
    </div>

    <div class="flex flex-center">
      <supply :siteId=siteId></supply>
    </div>

    <div class="flex flex-center">
      <incident :siteId=siteId></incident>
    </div>

    <div class="flex flex-center">
      <changeSiteLead :siteId=siteId></changeSiteLead>
      <changeShiftLead :siteId=siteId></changeShiftLead>
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
import phoneContact from "../../../components/phoneContact";
import supply from "../../../components/siteDetail/supply";
import peopleBar from "../../../components/peopleBar";
import petBar from "../../../components/petBar";

export default {
    name: "PageIndex",
    components: {
        phoneContact,
        supply,
        peopleBar,
        petBar
    },
    props: [""],
    data() {
        return {
            zsubscriptions: ["org/egan"],
            siteId: this.$route.params.siteId,
            currentUserHasTakenControl: null // starts with special value null, so that the data from the server takes precedence over the state of the UI or vice versa when necessary
        };
    },
    computed: {
        site() {
            try {
                return this.zsubData["org/egan"].site[this.siteId];
            } catch (e) {
                return {};
            }
        },
        currentUserCanTakeControl() {
            // TODO/FIXME: replace the value of user with real value
            const user = {
                firstName: "George",
                id: "a",
                roles: ["someRole", "siteLead", "shiftLead"]
            };

            const isSiteLead = user.roles.some(role => role === "siteLead");
            const isShiftLead = user.roles.some(role => role === "shiftLead");
            if (isSiteLead) {
                return "Take Site Lead";
            } else if (isShiftLead) {
                return "Take Shift Lead";
            }

            return false;
        },
        currentUserIsInControl() {
            if (!this.site.active) {
                return false;
            }

            // TODO/FIXME: replace the value of user with real value
            const user = {
                firstName: "George",
                id: "a",
                roles: ["someRole", "siteLead", "shiftLead"]
            };
            const isSiteLead = user.roles.some(role => role === "siteLead");
            const isShiftLead = user.roles.some(role => role === "shiftLead");

            if (this.currentUserHasTakenControl === null) {
                // the state of the UI is not enough to know if the user has taken control
                if (isSiteLead) {
                    return user.id === this.site.siteLead.id;
                } else if (isShiftLead) {
                    return user.id === this.site.shiftLead.id;
                }
            } else if (this.currentUserHasTakenControl === true) {
                // the state of the UI is the source of truth when the user has taken control via a click on the toggle button
                return true;
            }

            return false;
        }
    },
    created() {},
    mounted() {},
    methods: {
        toggleControl() {
            // TODO/FIXME: replace the value of user with real value
            // NOTE: The toggle will not
            const user = {
                firstName: "George",
                id: "a",
                roles: ["someRole", "siteLead", "shiftLead"]
            };
            // TODO/FIXME: Send a server request
            // no need to handle the response since the state of the UI is updated to reflect that the user has taken control


            if (this.currentUserHasTakenControl === false) {
                // the user has previously given up control via a click on the UI
                this.currentUserHasTakenControl = true;
            } else if (this.currentUserHasTakenControl === true) {
                // the user has previously taken control via a click on the UI
                this.currentUserHasTakenControl = false;
            } else if (this.currentUserHasTakenControl === null) {
                // the user has not interacted with the toggle button yet; server data takes precedence to know whether the user has taken control
                const isSiteLead = user.roles.some(role => role === "siteLead");
                const isShiftLead = user.roles.some(role => role === "shiftLead");
                if (isSiteLead || isShiftLead) {
                    this.currentUserHasTakenControl = false;
                } else {
                    this.currentUserHasTakenControl = true;
                }
            }
            console.log(
                "User has toggled their control on the site to",
                this.currentUserHasTakenControl
            );
        }
    }
};
</script>

<style scoped>

</style>
