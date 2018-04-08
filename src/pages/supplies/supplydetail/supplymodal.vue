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
                <q-item>
                    <q-input v-model="numeric" type="number" value="1"></q-input>
                </q-item>
            </q-list>
            <q-toolbar slot="footer">
                <q-btn> Submit </q-btn>
            </q-toolbar>
        </q-modal-layout>
    </q-modal>
</template>

<style>

</style>

<script>
export default {
    name: '',
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
