<template>
    <q-list>
        <q-list-header>Food</q-list-header>
        <q-item-separator />
        <q-item>
            <q-item-main class="itemTitle">
                food
            </q-item-main>
            <q-item-side right>
                <quick-supply-number value=0 />
            </q-item-side>
        </q-item>
        <q-item-separator />
        <q-item>
            <q-item-main class="itemTitle">
                Another item, this is longggggggg
            </q-item-main>
            <q-item-side right>
                <quick-supply-number value=0 />
            </q-item-side>
        </q-item>
    </q-list>
</template>

<style>

</style>

<script>
import quickSupplyNumber from "./quickSupplyNumber"

export default {
    name: '',
    components: {
        quickSupplyNumber
    },
    props: ['supplies'],
    data() {
        return {
            zsubscriptions: ['org/egan'],
        };
    },
    computed: {},
    created() {},
    mounted() {
        console.log(this.supplies)
    },
    methods: {},
};
</script>
