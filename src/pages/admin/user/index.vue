<template>
  <q-table
    :data="tableData"
    :columns="columns"
    :selection="selection"
    :selected.sync="selected"
    :loading="loading"
    row-key="name"
    color="secondary"
    class="adminTable"
  >
    <q-tr slot="top-row" slot-scope="props">
      <q-td colspan="100%">
        <strong>Extra top row</strong>
      </q-td>
    </q-tr>

    <q-tr slot="bottom-row" slot-scope="props">
      <q-td colspan="100%">
        <strong>Extra bottom row</strong>
      </q-td>
    </q-tr>

    <template slot="top-left" slot-scope="props">
      <q-select
        v-model="selection"
        stack-label="Selection"
        hide-underline
        :options="[
          { label: 'Single', value: 'single' },
          { label: 'Multiple', value: 'multiple' },
          { label: 'None', value: 'none' }
        ]"
        color="secondary"
        style="min-width: 100px"
      />
    </template>
    <div slot="top-right" slot-scope="props" class="column">
      <q-toggle
        v-model="loading"
        label="Loading state"
        color="secondary"
        class="q-mb-sm"
      />
      <q-toggle
        v-model="dark"
        label="On dark background"
        color="secondary"
      />
    </div>
  </q-table>
</template>

<style scoped>
.adminTable{
  width:100%
}
</style>

<script>
const columns = /* array of Objects */ [
    // column Object definition
    {
    // unique id (used by row-key, pagination.sortBy, ...)
        name: 'email',

        // label for header
        label: 'Users',

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
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
    // function return value:
    //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
    //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
    //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first
    },
    { name: 'firstName', label: 'First', field: 'firstName', sortable: true },
    { name: 'lastName', label: 'Last', field: 'lastName', sortable: true },
    { name: 'email', label: 'Email', field: 'email' },
    // { name: 'protein', label: 'Protein (g)', field: 'protein' },
    // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
    // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

export default {
    name: 'adminUser',
    components: {},
    props: ["org"],
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
        users(){
            try {
                console.log("sub data", this.zsubData.user);
                return this.zsubData.user;
            } catch (e) {
                return {};
            }
        },
        tableData(){
            try {
                console.log("user table data", this.zsubData.user);
                return this.zsubData.user;
            } catch (e) {
                return {};
            }
        }

    },
    created() {},
    mounted() {
        console.log("site", this.site);
    // const self = this;
    // this.$nextTick(() => {
    //     try {
    //     } catch (e) {
    //         //
    //     }
    // });
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
            return site.supports.ageGroup === "adult";
        },
        isChildFriendly(site) {
            return site.supports.ageGroup === "child";
        }
    }
};

</script>
