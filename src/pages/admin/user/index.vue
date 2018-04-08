<template>
  <q-page class="flex">
    <q-table :data="users"
             :columns="columns"
             :selection="selection"
             :selected.sync="selected"
             :loading="loading"
             row-key="email"
             color="secondary"
             class="tableClass">
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
import { userAdmin } from '../../../storeWriter'

const columns = /* array of Objects */ [
    // column Object definition
    { name: 'firstName', label: 'First', field: 'firstName', sortable: true },
    { name: 'lastName', label: 'Last', field: 'lastName', sortable: true },
    { name: 'email', label: 'Email', field: 'email' },
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
            selection: 'multiple',
            selected: [],
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
        toggleActive(){
            lodash.each(this.selected, ele => {
                userAdmin.toggleActive(ele.id, !ele.active)
            })
        }
    },
};
</script>
