<template>
  <q-modal maximized
           v-model="open"
           v-if="open">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat
               round
               dense
               @click=close
               icon="keyboard_arrow_left" />
        <q-toolbar-title> Supply Form </q-toolbar-title>
      </q-toolbar>
      <supply-list-item :supplies=supplies
                        v-on:updated="saveList" />
      <q-toolbar slot="footer">
        <q-btn @click=submitSupplies> Submit </q-btn>
      </q-toolbar>
    </q-modal-layout>
  </q-modal>
</template>

<style>

</style>

<script>
import supplyListItem from './supplylistitem';
import lodash from 'lodash';

export default {
    name: '',
    components: {
        supplyListItem,
    },
    props: ['open', 'close'],
    data() {
        return {
            zsubscriptions: ['org/egan'],
            opened: this.open,
            newSupplyList: {},
        };
    },
    computed: {
        supplies() {
            try {
                return this.zsubData['org/egan'].supplies;
            } catch (e) {
                return [];
            }
        },
    },
    created() {},
    mounted() {},
    methods: {
        submitSupplies() {
            // const temp = lodash.flatten(this.newSupplyList)
            let temp = lodash.transform(
                this.newSupplyList,
                (a, ele) => {
                    a.push(...ele)
                    return a;
                },
                []
            );
            temp = lodash.map(temp, ele => {
                ele.qty = ele.qty || +0
                return ele
            })
            this.$emit('submit', temp);
        },
        saveList(list) {
            this.newSupplyList = list;
        },
    },
};
</script>
