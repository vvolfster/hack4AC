<template>
  <div id="root"
       class="q-pa-sm">
    <q-table class="supplytable"
             title="Supplies Needed"
             row-key='name'
             :columns="columns"
             :data="suppliesNeeded">
      <template slot="top-selection"
                slot-scope="props">
        <q-btn color="secondary"
               flat
               label="Add Item" />
        <q-btn color="secondary"
               flat
               label="Fulfill" />
        <div class="col" />
        <q-btn color="negative"
               flat
               round
               delete
               icon="delete"
               @click="deleteRow" />
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
    name: 'supplies',
    components: {},
    props: ['readOnly', 'suppliesNeeded'],
    data() {
        return {};
    },
    computed: {
        columns() {
            return [
                {
                    name: 'name',
                    required: true,
                    label: 'Item',
                    align: 'left',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'qty',
                    required: true,
                    label: 'Quantity',
                    align: 'left',
                    field: 'qty',
                    sortable: true,
                },
            ];
        },
    },
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style scoped>

</style>
