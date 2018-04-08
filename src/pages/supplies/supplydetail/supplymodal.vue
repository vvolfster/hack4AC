<template>
    <q-modal maximized v-model="opened">
        <q-modal-layout>
            <q-toolbar slot="header">
                <q-btn
                    flat
                    round
                    dense
                    v-close-overlay
                    icon="keyboard_arrow_left"
                />
                <q-toolbar-title> Supply Form </q-toolbar-title>
            </q-toolbar>
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
            <q-toolbar slot="footer">
                <q-btn> Submit </q-btn>
            </q-toolbar>
        </q-modal-layout>
    </q-modal>
</template>

<style>
.itemTitle {
    width:75%;
}
</style>

<script>
import quickSupplyNumber from "./quickSupplyNumber"

export default {
    name: '',
    components: {
        quickSupplyNumber
    },
    props: ['open'],
    data() {
        return {
            zsubscriptions: ['org/egan'],
            opened: this.open
        };
    },
    computed: {
    },
    created() {},
    mounted() {
        console.log("this is rendered")
    },
    methods: {
    },
};
</script>
