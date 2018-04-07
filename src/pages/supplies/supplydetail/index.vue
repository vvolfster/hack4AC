<template>
  <q-page class='flex'>
        <div v-if="!computedData">
            Still loading
        </div>
        <q-table
            v-else
            class="supplytable"
            title='Supply Dashboard'
            row-key='name'
            :columns="computedData.columns"
            :data="computedData.tableData"
            :selection="computedData.selection"
            :selected.sync="computedData.selected"
        >
            <template slot="top-selection" slot-scope="props">
                <q-btn color="secondary" flat label="Fulfill" />
                <div class="col" />
                <q-btn color="negative" flat round delete icon="delete" @click="deleteRow" />
            </template>
        </q-table>

  </q-page>
</template>

<style scoped>
.supplytable {
    width: 100%
}
</style>

<script>
export default {
    name: 'SupplyDashboard',
    props: [""], // TODO siteID should go here
    computed: {
        computedData() {
            if(!this.currentSite)
                return null

            return {
                siteId: "a",
                zsubscriptions: [`org/egan/site/a`],
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
                tableData: this.currentSite.suppliesNeeded,
                selection: 'multiple',
                selected: [

                ]
            }
        },
        currentSite() {
            try {
                return this.zsubData[`org/egan/site/${this.siteId}`];
            } catch (e) {
                return {};
            }
        },
        supplyList() {
            // const supplyList = this.currentSite.suppliesNeeded
            // const transformedList = {}
            // TODO transfrom list to match the data your table expects'
            // return transformedList
            return {}
        }
    },
    methods: {
        getSupplyData() {
        },
        deleteRow() {
            console.log("womp")
        }
    }
};

/* [
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
        ]
*/
</script>
