<template>
    <q-page class="flex">
        <q-table :data="tableData"
                 :columns="columns"
                 :selection="selection"
                 :selected.sync="selected"
                 :pagination.sync="pagination"
                 :loading="loading"
                 row-key="name"
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
                <div class="col" />
            </template>
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
                <admin-supply-add :site="selected[0]"
                                v-on:submit="submitForm"></admin-supply-add>
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
import adminSupplyAdd from '../../../components/adminSupplyAdd';
import Vue from "vue"
import { site as siteWriter } from "../../../storeWriter"
import Constants from "../../../Constants"

const columns = /* array of Objects */ [
    // column Object definition
    { name: 'name', label: 'Name', field: 'name', sortable: true, align: 'left' },
    {
        name: 'category',
        label: 'Category',
        field: 'category',
        align: 'left'
    },
    // { name: 'protein', label: 'Protein (g)', field: 'protein' },
    // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
];

export default {
    name: 'adminSite',
    components: {
        adminSupplyAdd,
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
            pagination: {
                sortBy: null, // String, column "name" property value
                descending: false,
                page: 1,
                rowsPerPage: 7 // current rows per page being displayed
            }
        };
    },
    computed: {
        tableData() {
            try {
                // console.log(this.org.site);
                return lodash.toArray(this.org.supplies);
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
        clearSelection() {
            this.selected = []
        },
        toggleActive(){
            const payloadSite = Constants.clone(this.selected[0])
            /* eslint-disable-next-line */
            delete payloadSite.__index

            payloadSite.active = !payloadSite.active
            siteWriter.updateSite(payloadSite.id, payloadSite).then(this.clearSelection)
        },
        submitForm(data) {
            // console.log('SUBMITTING SITE admin data', data);
            if (this.selected.length > 0) {
                const payloadSite = Constants.clone(this.selected[0])
                /* eslint-disable-next-line */
                delete payloadSite.__index

                payloadSite.title = data.title
                payloadSite.guest.max = data.maxGuests
                payloadSite.pets.max = data.maxPets
                payloadSite.supports.ADA = data.supportsADA
                payloadSite.supports.pets = data.supportsPets
                payloadSite.supports.ageGroup = data.ageGroup
                payloadSite.streetAddress = data.streetAddress

                if(!lodash.isNumber(payloadSite.guest.max))
                    payloadSite.guest.max = parseInt(payloadSite.guest.max.trim(), 10)

                if(!lodash.isNumber(payloadSite.pets.max))
                    payloadSite.pets.max = parseInt(payloadSite.pets.max.trim(), 10)

                // console.log('update the fucking site', payloadSite.id, payloadSite)
                siteWriter.updateSite(payloadSite.id, payloadSite).then(this.clearSelection)
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
                        max: data.maxPets,
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
                    site.guest.max = parseInt(site.guest.max.trim(), 10)

                if(!lodash.isNumber(site.pets.max))
                    site.pets.max = parseInt(site.pets.max.trim(), 10)

                siteWriter.addSite(site).then(() => {
                    Vue.toast.positive(`${site.title}: Site Created`)
                })
            }
        },
    },
};
</script>
