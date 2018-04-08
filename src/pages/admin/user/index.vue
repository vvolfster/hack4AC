<template>
    <q-page class="flex">
        <q-table :data="users"
                 :columns="columns"
                 :selection="selection"
                 :selected.sync="selected"
                 :pagination.sync="pagination"
                 :loading="loading"
                 row-key="email"
                 color="secondary"
                 class="tableClass">
            <template slot="top-selection"
                      slot-scope="props">
                <!-- <q-btn color="secondary"
                       icon="fas fa-edit"
                       label="edit"
                       class="q-mr-sm" /> -->
                <q-btn color="secondary"
                       @click="toggleActiveState"
                       icon="fas fa-power-off"
                       label="Active/Inactive" />
                <div class="col" />
            </template>
        </q-table>
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
import { userAdmin } from '../../../storeWriter';

const columns = /* array of Objects */ [
    // column Object definition
    { name: 'firstName', label: 'First', align: 'left', field: 'firstName', sortable: true },
    { name: 'lastName', label: 'Last', align: 'left', field: 'lastName', sortable: true },
    { name: 'email', label: 'Email', align: 'left', field: 'email' },
    // { name: 'protein', label: 'Protein (g)', field: 'protein' },
    // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
];

export default {
    name: 'adminUser',
    components: {},
    props: ['org'],
    data() {
        return {
            columns,
            loading: false,
            dark: true,
            selection: 'single',
            selected: [],
            pagination: {
                sortBy: null, // String, column "name" property value
                descending: false,
                page: 1,
                rowsPerPage: 15 // current rows per page being displayed
            }
        };
    },
    computed: {
        users() {
            try {
                return lodash.toArray(this.org.users);
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
        toggleActive() {
            lodash.each(this.selected, ele => {
                userAdmin.toggleActiveState(ele.id, !ele.active);
            });
        },
    },
};
</script>
