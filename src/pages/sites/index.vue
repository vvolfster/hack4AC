<template>
  <!-- main dashboard -->
    <q-page>
        <!-- <q-select v-model="selectField" :options="selectOptions" @change="field=selectField">
            </q-select>
            <q-btn-toggle v-model="selectOrder" @input="order=selectOrder"
                toggle-color="primary"
                :options="[
                    {label: 'Asc', value: 'asc'},
                    {label: 'Desc', value: 'desc'}
                ]"
            /> -->
        <q-list highlight>
            <div v-for="(s, key) in sortedSites" :key="key" v-if="s.active">
                <div @click="$router.push('/detail/' + s.id)">
                    <site-card :site="s" />
                </div>
            </div>
        </q-list>
    </q-page>
</template>

<style scoped>
.main--page {
    /* width: 100%; */
}
.main--list {
    /* width: 100%; */
}
</style>

<script>
import siteCard from "../../components/siteCard";
import lodash from 'lodash'

export default {
    name: 'PageIndex',
    components: {
        siteCard,
    },
    data() {
        return {
            zsubscriptions: ["org/egan"],
            selectField: '',
            selectOrder: '',
            order: 'asc',
            field: 'title',
            selectOptions: [
                {
                    label: 'Title',
                    value: 'title'
                },
                {
                    label: 'Checked Guest',
                    value: 'guest.current'
                },
                {
                    label: 'Total Guest',
                    value: 'guest.max'
                },
                {
                    label: 'Supplies Needed',
                    value: 'suppliesNeeded'
                },
                {
                    label: 'Volunteers',
                    value: 'volunteer.current'
                }
            ],
        };
    },
    computed: {
        sites() {
            try {
                return this.zsubData["org/egan"].site;
            } catch (e) {
                return {};
            }
        },
        sortedSites(){
            try{
                const sortData = lodash.orderBy(this.sites, (site) => { if (typeof lodash.get(site, this.field) === 'object') { return lodash.get(site, this.field).length }  return lodash.get(site, this.field) }, [this.order]);
                return sortData;
            } catch (e){
                return {};
            }
        }
    },
    methods: {
        getPercent(site) {
            const x = site.guest.current / site.guest.max;
            return x * 100;
        },
        toggleSort() {
            this.order = 'desc'
        },
        sortList(field) {
            this.field = field;
            // return {};
        }
    }
};
</script>
