<template>
    <q-page class="flex">
        <q-table :data="tableData"
                 :columns="columns"
                 :selection="selection"
                 :selected.sync="selected"
                 :loading="loading"
                 row-key="name"
                 color="secondary"
                 class="tableClass">
            <!-- <q-tr slot="top-row" slot-scope="props">
        <q-td colspan="100%">
            <strong>Extra top row</strong>
        </q-td>
        </q-tr>

        <q-tr slot="bottom-row" slot-scope="props">
        <q-td colspan="100%">
            <strong>Extra bottom row</strong>
        </q-td>
        </q-tr> -->

            <!-- <template slot="top-left" slot-scope="props">
                <q-select v-model="selection" stack-label="Selection" hide-underline :options="[
            { label: 'Single', value: 'single' },
            { label: 'Multiple', value: 'multiple' },
            { label: 'None', value: 'none' }
            ]" color="secondary" style="min-width: 100px" />
        </template> -->
            <!-- <div slot="top-right" slot-scope="props" class="column">
            <q-toggle v-model="loading" label="Loading state" color="secondary" class="q-mb-sm" />
            <q-toggle v-model="dark" label="On dark background" color="secondary" />
        </div> -->
        </q-table>
        <q-btn round
               color="primary"
               @click="showSiteModal"
               class="fixed"
               icon="add"
               style="right: 18px; bottom: 18px" />

        <q-modal v-if="siteAddModalVis"
                 v-model="siteAddModalVis">
            <div class="column">
                <admin-site-add v-on:submit="submitForm"></admin-site-add>
            </div>
            <q-page-sticky position="bottom">
                <div class="modal--close-button">
                    <q-btn color="primary"
                           @click="closeModal"
                           label="Close" />
                </div>
            </q-page-sticky>

        </q-modal>
    </q-page>

</template>

<style>
.tableClass {
    height: 100%;
    width: 100%;
}
</style>

<script>
import lodash from 'lodash';
import adminSiteAdd from '../../../components/adminSiteAdd'

const columns = /* array of Objects */ [
    // column Object definition
    {
        // unique id (used by row-key, pagination.sortBy, ...)
        name: 'id',

        // label for header
        // label: 'Users',

        // row Object property to determine value for this column
        field: 'name',
        // OR field: row => row.some.nested.prop

        // (optional) if we use visible-columns, this col will always be visible
        // required: true,

        // (optional) alignment
        align: 'left',

        // (optional) tell QTable you want this column sortable
        sortable: true,

        // (optional) compare function if you have
        // some custom data or want a specific way to compare two rows
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        // function return value:
        //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
        //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
        //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first
    },
    { name: 'title', label: 'Title', field: 'title', sortable: true },
    { name: 'guest.max', label: 'Capacity', field: 'guest.max', sortable: true },
    // { name: 'email', label: 'Email', field: 'email' },
    // { name: 'protein', label: 'Protein (g)', field: 'protein' },
    // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
];

export default {
    name: 'adminSite',
    components: {
        adminSiteAdd
    },
    props: ['org'],
    data() {
        return {
            columns,
            loading: false,
            dark: true,
            selection: 'multiple',
            selected: [],
            siteAddModalVis: false,
        };
    },
    computed: {
        tableData() {
            try {
                console.log(this.org.site);
                const data = lodash.toArray(this.org.site);
                return lodash.map(data, (ele, i) => {
                    ele.id = i;
                    return ele;
                });
            } catch (e) {
                return {};
            }
        },
    },
    methods: {
        getPercentPeople(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
        getPercentPets(site) {
            const x = site.pets.current / site.pets.max;
            return x * 100;
        },
        isAccessible(site) {
            return site.supports.ADA;
        },
        isPetFriendly(site) {
            return site.supports.pets;
        },
        isAdultFriendly(site) {
            return site.supports.ageGroup === 'adult';
        },
        isChildFriendly(site) {
            return site.supports.ageGroup === 'child';
        },
        closeModal() {
            this.siteAddModalVis = false;
        },
        showSiteModal() {
            this.siteAddModalVis = true;
        },
        submitForm(data){
            console.log("SUBMITTING SITE admin data", data)
            if(this.selected.length > 0){
                // update function!
            }else{
                // addFunction
                const site =  {
                    active: true,
                    guest: {
                        current: 0,
                        inTransit: 0,
                        lastUpdated: 1523117016889,
                        max: data.maxGuests,
                        pickUpNeeded: 0,
                        reserved: 0
                    },
                    id: "",
                    pets: {
                        current: 0,
                        inTransit: 0,
                        lastUpdated: 1523082682773,
                        max: data.mexPets
                    },
                    shiftLead: {
                        dateCreated: "2018-04-08T03:17:45.890Z",
                        displayName: "new",
                        email: "new@test.com",
                        firstName: "new",
                        id: "new",
                        lastName: "new",
                        onSite: "id",
                        phone: "1234567890",
                    },
                    siteLead: {
                        dateCreated: "2018-04-08T03:17:45.890Z",
                        displayName: "new",
                        email: "new@test.com",
                        firstName: "new",
                        id: "new",
                        lastName: "new",
                        onSite: "id",
                        phone: "1234567890",
                    },
                    streetAddress: data.streetAddress,
                    suppliesNeeded: [{
                        fulfilled: true,
                        name: "Jelly",
                        category: "kitchen",
                        qty: 1
                    }],
                    supplyNote: ".",
                    supports: {
                        ADA: data.supportsADA,
                        ageGroup: data.ageGroup,
                        pets: data.supportsPets
                    },
                    title: data.title,
                    volunteer: {
                        current: 0,
                        lastUpdated: 1523082682773
                    }
                }
                console.log("WOLFY submit this to the add site", site)
            }
        }
    },
};
</script>
