<template>
  <q-list sparse=sparse>
    <div v-for="(category, key) in getFilteredSupplies"
         :key="key">
      <q-list-header>{{ key }}</q-list-header>
      <div v-for="(supply, key1) in category"
           :key="key1">
        <q-item-separator />
        <q-item>
          <q-item-main>
          {{ `\t${supply.name}` }}
          </q-item-main>
          <q-item-side right>
            <quick-supply-number value=0 @input="sendListUp(supply,$event)" />
          </q-item-side>
        </q-item>
        <q-item-separator />
      </div>
    </div>
  </q-list>
</template>

<style>

</style>

<script>
import quickSupplyNumber from './quickSupplyNumber';
import lodash from 'lodash';

export default {
    name: '',
    components: {
        quickSupplyNumber,
    },
    props: ['supplies'],
    data() {
        return {
            zsubscriptions: [`org/${this.currentOrgId}`],
            supplyList: {},
            sparse: true
        };
    },
    computed: {
        getCategories() {
            return lodash.uniq(lodash.map(this.supplies, 'category'));
        },
        getFilteredSupplies() {
            // eslint-disable-next-line
            this.supplyList = lodash.transform(
                this.supplies,
                (a, e) => {
                    a[e.category] = a[e.category] || [];
                    a[e.category].push(e);
                    return a;
                },
                {}
            );
            return this.supplyList;
        },
    },
    created() {},
    mounted() {},
    methods: {
        sendListUp(supplyItem, val) {
            supplyItem.qty = val
            this.$emit("updated", this.supplyList)
        }
    },
};
</script>
