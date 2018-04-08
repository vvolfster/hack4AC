<template>
  <!-- main dashboard -->
    <q-page>
        <q-list highlight>
            <q-select v-model="selectField" :options="selectOptions" @change="field=selectField">
            </q-select>
            <q-btn-toggle v-model="selectOrder" @input="order=selectOrder"
                toggle-color="primary"
                :options="[
                    {label: 'Asc', value: 'asc'},
                    {label: 'Desc', value: 'desc'}
                ]"
            />
            <div v-for="(s, key) in sortedSites" :key="key" v-if="s.active">
                <div @click="$router.push('/detail/' + key)">
                    <site-card :site="s" @siteClicked="clickSite" />
                </div>
            </div>
        </q-list>
    </q-page>
</template>

<style>
</style>

<script>
import siteCard from "../../components/siteCard";
import _ from 'lodash'

export default {
    name: 'PageIndex',
    components: {
        siteCard
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
                console.log("sub data", this.zsubData["org/egan"]);
                return this.zsubData["org/egan"].site;
            } catch (e) {
                return {};
            }
        },
        sortedSites(){
            try{
                const sortData = _.orderBy(this.sites, (site) => { if (typeof _.get(site, this.field) === 'object') { console.log("shweta", _.get(site, this.field).length); return _.get(site, this.field).length }  return _.get(site, this.field) }, [this.order]);
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
        clickSite(site) {
            console.log("clicked site", site);
        },
        toggleSort() {
            this.order = 'desc'
        },
        sortList(field) {
            console.log("Sorted data on field", field);
            this.field = field;
            // return {};
        }
    }
};
</script>
