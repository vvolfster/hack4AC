<template>
  <q-page class='flex'>
    <div v-if="!computedData">
      Still loading
    </div>
    <q-table v-else
             class="supplytable"
             :title="computedData.dashboardTitle"
             row-key='uuid'
             :columns="computedData.columns"
             :data="computedData.tableData"
             :selection="computedData.selection"
             :selected.sync="selected"
             :pagination:sync="pagination"
             :visible-columns="visible">
      <template slot="top-selection"
                slot-scope="props">
      <q-btn color="secondary"
               flat
               label="Fulfill"
               @click="fulfillItems" />
        <div class="col" />
        <q-btn color="negative"
               flat
               round
               delete
               icon="delete"
               @click="deleteRow" />
      </template>
    </q-table>

    <q-page-sticky position="bottom-right"
                   :offset="[18, 18]">
      <q-btn round
             color="primary"
             @click="openModal"
             icon="add" />
    </q-page-sticky>
    <supply-modal :open=open :close=closeModal @submit="submitForm"> </supply-modal>
  </q-page>
</template>

<style scoped>
.supplytable {
  width: 100%;
}
</style>

<script>
import supplyModal from './supplymodal'
import lodash from 'lodash'
import { site } from '../../../storeWriter.js'

export default {
    name: 'SupplyDashboard',
    components: {
        supplyModal
    },
    props: [''],
    data() {
        const siteId = this.$route.params.siteID;
        return {
            siteId,
            zsubscriptions: [`org/egan/site/${siteId}`],
            selected: [],
            visible: ["name", "qty", "fulfilled"],
            open: false,
            pagination: {
                sortBy: null, // String, column "name" property value
                descending: false,
                page: 1,
                rowsPerPage: 15 // current rows per page being displayed
            }
        };
    },
    computed: {
        computedData() {
            if (!this.currentSite) return null;

            this.addUUID()
            return {
                siteId: this.siteId,
                columns: [
                    {
                        name: "name",
                        required: true,
                        label: "Item",
                        align: "left",
                        field: "name",
                        sortable: true
                    },
                    {
                        name: "qty",
                        required: true,
                        label: "Quantity",
                        align: "left",
                        field: "qty",
                        sortable: true
                    },
                    {
                        name: "fulfilled",
                        required: true,
                        label: "Fulfilled?",
                        align: "left",
                        field: "fulfilled",
                        sortable: true
                    },
                    {
                        name: "uuid",
                        required: true,
                        field: "uuid",
                    }
                ],
                tableData: this.currentSite.suppliesNeeded,
                selection: 'multiple',
                dashboardTitle: `Supply Dashboard for ${this.currentSite.title}`
            };
        },
        currentSite() {
            try {
                return this.zsubData[`org/egan/site/${this.siteId}`];
            } catch (e) {
                return {};
            }
        },
        supplyList() {
            // TODO transfrom list to match the data your table expects'
            return {};
        }
    },
    methods: {
        deleteRow() {

        },
        openModal() {
            this.open = true
            return true
        },
        closeModal() {
            this.open = false
            return false
        },
        submitForm(data){
            this.closeModal()
            const newData = data.concat(this.currentSite.suppliesNeeded)
            site.updateSuppliesNeeded(this.siteId, newData)
        },
        fulfillItems() {
            lodash.map(this.selected, e => {
                e.fulfilled = true
                return e
            })
            site.updateSuppliesNeeded(this.siteId, this.currentSite.suppliesNeeded)
        },
        addUUID() {
            const randNum = () => Math.floor(Math.random()) * 100
            const newSupplies = lodash.map(this.currentSite.suppliesNeeded, (e) => {
                if (e.uuid === null) {
                    const uuid = randNum
                    e.uuid = uuid
                }
                return e
            })
            site.updateSuppliesNeeded(this.siteId, newSupplies)
        }
    },
};
</script>
