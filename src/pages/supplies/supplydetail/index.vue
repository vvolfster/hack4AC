<template>
  <q-page class='flex'>
    <div v-if="!computedData">
      Still loading
    </div>
    <q-table v-else
             class="supplytable"
             :title="computedData.dashboardTitle"
             row-key='name'
             :columns="computedData.columns"
             :data="computedData.tableData"
             :selection="computedData.selection"
             :selected.sync="selected">
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


    <supplyModal/>
    <q-page-sticky position="bottom-right"
                   :offset="[18, 18]">
      <q-btn round
             color="primary"
             @click="openModal()"
             icon="add" />
    </q-page-sticky>

  </q-page>
</template>

<style scoped>
.supplytable {
  width: 100%;
}
</style>

<script>
import supplyModal from '.'

export default {
    name: 'SupplyDashboard',
    components: {
        supplyModal
    },
    props: [''],
    data() {
        const siteId = this.$route.params.siteID;
        console.log(siteId);
        return {
            siteId,
            zsubscriptions: [`org/egan/site/${siteId}`],
            selected: [],
            opened: false
        };
    },
    computed: {
        computedData() {
            if (!this.currentSite) return null;

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
            console.log('womp');
        },
        openModal(opened) {
            if (!opened) {
                opened = true
            }
        }
    },
};
</script>
