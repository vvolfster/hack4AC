<template>
    <q-page class="flex">
        <q-table :data="tableData"
                 :columns="columns"
                 :selection="selection"
                 :selected.sync="selected"
                 :loading="loading"
                 row-key="title"
                 color="secondary"
                 class="tableClass">

            <!-- gets displayed only when there's at least one row selected -->
            <template slot="top-selection"
                      slot-scope="props">
                <q-btn color="secondary"
                       @click="editAndShowModal"
                       icon="fas fa-edit"
                       label="edit"
                       class="q-mr-sm" />
                <q-btn color="secondary"
                       @click="toggleActive"
                       icon="fas fa-power-off"
                       label="Active/Inactive" />
                <div class="col" />
                <!-- <q-btn color="negative"
                       flat
                       round
                       delete
                       icon="delete"
                       @click="deleteRow" /> -->
            </template>
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
                <admin-site-add :site="selected[0]"
                                v-on:submit="submitForm"></admin-site-add>
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
import adminSiteAdd from '../../../components/adminSiteAdd';
import { site as siteWriter } from "../../../storeWriter"

const columns = /* array of Objects */ [
    // column Object definition
    { name: 'title', label: 'Title', field: 'title', sortable: true, align: 'left' },
    {
        name: 'active',
        label: 'Active',
        field: 'active',
        align: 'left',
        format: val => {
            return val ? 'Yes' : 'No';
        },
    },
    // { name: 'protein', label: 'Protein (g)', field: 'protein' },
    // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
];

export default {
    name: 'adminSite',
    components: {
        adminSiteAdd,
    },
    props: ['org'],
    data() {
        return {
            columns,
            loading: false,
            dark: true,
            selection: 'single',
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
        editAndShowModal(){
            this.siteAddModalVis = true;
        },
        showSiteModal() {
            this.selected = []
            this.siteAddModalVis = true;
        },
        addSite(payload) {
            // WOLF addSite
            // don't forget to add id field inside this object
            console.log(payload);
        },
        updateSite(payload) {
            // WOLF updateSite
            console.log(payload);
        },
        toggleActive() {
            const payloadSite = this.selected[0];
            payloadSite.active = !payloadSite.active;
            this.updateSite(payloadSite);
        },
        submitForm(data) {
            // console.log('SUBMITTING SITE admin data', data);
            if (this.selected.length > 0) {
                const payloadSite = this.selected[0]
                payloadSite.title = data.title
                payloadSite.guest.max = data.maxGuests
                payloadSite.pets.max = data.maxPets
                payloadSite.supports.ADA = data.supportsADA
                payloadSite.supports.pets = data.supportsPets
                payloadSite.supports.ageGroup = data.ageGroup
                payloadSite.streetAddress = data.streetAddress

                if(!lodash.isNumber(payloadSite.guest.max))
                    payloadSite.guest.max = parseInt(payloadSite.guest.max, 10)

                if(!lodash.isNumber(payloadSite.pets.max))
                    payloadSite.pets.max = parseInt(payloadSite.pets.max, 10)

                this.updateSite(payloadSite.id, payloadSite);
            } else {
                // addFunction
                const site = {
                    active: true,
                    guest: {
                        current: 0,
                        inTransit: 0,
                        lastUpdated: 1523117016889,
                        max: data.maxGuests,
                        pickUpNeeded: 0,
                        reserved: 0,
                    },
                    id: '',
                    pets: {
                        current: 0,
                        inTransit: 0,
                        lastUpdated: 1523082682773,
                        max: data.mexPets,
                    },
                    shiftLead: {
                        dateCreated: '2018-04-08T03:17:45.890Z',
                        displayName: 'new',
                        email: 'new@test.com',
                        firstName: 'new',
                        id: 'new',
                        lastName: 'new',
                        onSite: 'id',
                        phone: '1234567890',
                    },
                    siteLead: {
                        dateCreated: '2018-04-08T03:17:45.890Z',
                        displayName: 'new',
                        email: 'new@test.com',
                        firstName: 'new',
                        id: 'new',
                        lastName: 'new',
                        onSite: 'id',
                        phone: '1234567890',
                    },
                    streetAddress: data.streetAddress,
                    suppliesNeeded: [
                        {
                            fulfilled: true,
                            name: 'Jelly',
                            category: 'kitchen',
                            qty: 1,
                        },
                    ],
                    supplyNote: '.',
                    supports: {
                        ADA: data.supportsADA,
                        ageGroup: data.ageGroup,
                        pets: data.supportsPets,
                    },
                    title: data.title,
                    volunteer: {
                        current: 0,
                        lastUpdated: 1523082682773,
                    },
                };

                if(!lodash.isNumber(site.guest.max))
                    site.guest.max = parseInt(site.guest.max, 10)

                if(!lodash.isNumber(site.pets.max))
                    site.pets.max = parseInt(site.pets.max, 10)

                siteWriter.addSite(site);
            }
        },
    },
};
</script>
