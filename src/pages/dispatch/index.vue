<template>
  <q-page class="flex flex-center">
    in transit
  </q-page>
</template>

<style>

</style>

<script>
// import lodash from "lodash";
// import moment from "moment";

export default {
    name: "dispatch",
    components: {},
    props: [""],
    data() {
        return {
            site: {
                a: {
                    active: true,
                    guest: {
                        max: 10,
                        reserved: 1,
                        current: 5,
                        lastUpdated: 1523082682773,
                        pickUpNeeded: 1
                    },
                    volunteer: {
                        current: 5,
                        lastUpdated: 1523082682773
                    },
                    pets: {
                        max: 5,
                        current: 2,
                        lastUpdated: 1523082682773
                    },
                    supports: {
                        ADA: false,
                        ageGroup: "adult",
                        pets: true
                    },
                    siteLead: {
                        firstName: "Brett",
                        lastName: "Ansite",
                        email: "thebart@gmail.com",
                        phone: "5413594679",
                        roles: ["driver"],
                        id: "a"
                    },
                    shiftLead: {
                        firstName: "Anam",
                        lastName: "Kazi",
                        email: "anamfaryal412@gmail.com",
                        phone: "5415550000",
                        roles: ["driver"],
                        id: "b"
                    },
                    suppliesNeeded: [
                        {
                            name: "toilet paper",
                            qty: 10,
                            fulfilled: true
                        },
                        {
                            name: "garbage bags",
                            qty: 3,
                            fulfilled: false
                        }
                    ],
                    supplyNote: "Please bring me lots of supplies",
                    history: {
                        "2018-4-5": {
                            incidents: [],
                            suppliesNeeded: [],
                            volunteerHours: []
                        }
                    }
                }
            }
        };
    },
    computed: {},
    created() {},
    mounted() {
        // const self = this;

        // this.$nextTick(() => {
        //     try {
        //     } catch (e) {
        //         //
        //     }
        // });
    },
    methods: {}
};
</script>
