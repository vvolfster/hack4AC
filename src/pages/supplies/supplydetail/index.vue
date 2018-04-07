<template>
  <q-page class='flex flex-center'>
    <q-table
        title='Supply Dashboard'
        :columns="columns"
        :data="tableData"
        :selection="selection"
    />

  </q-page>
</template>

<style>
</style>

<script>
export default {
    name: 'SupplyDetail',
    data: () => ({
        columns: [
            {
                name: 'name',
                required: true,
                label: 'Item',
                align: 'left',
                field: 'name',
                sortable: true
            },
            {
                name: 'qty',
                required: true,
                label: 'Quantity',
                align: 'left',
                field: 'qty',
                sortable: true
            },
            {
                name: 'fulfilled',
                required: true,
                label: 'Fulfilled?',
                align: 'left',
                field: 'fulfilled',
                sortable: true
            }
        ],
        tableData: [
            {
                name: 'toilet paper',
                qty: 10,
                fulfilled: true
            },
            {
                name: 'garbage bags',
                qty: 3,
                fulfilled: false
            }
        ],
        selection: 'multiple',
        selected: []
    })
};
</script>
/*        return {
            zsubscriptions: ["org/egan"]    // subscribe to this path in the database. CHANGES ARE REALTIME.
        }
*/
