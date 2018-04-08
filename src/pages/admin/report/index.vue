<template>
    <q-page class="flex flex-center">
        <div class="column">
            <q-btn label="Email Yesterday's Report"
                @click="generateReport">
            </q-btn>
            <q-btn @click.stop="resetCounts">Reset counts</q-btn>
        </div>
    </q-page>
</template>

<style>

</style>

<script>
import axios from 'axios';
import { Dialog } from 'quasar'
import { site } from "../../../storeWriter"

export default {
    name: 'reports',
    data() {
        return {};
    },
    methods: {
        generateReport() {
            axios.post('https://us-central1-warmingn-5dbc7.cloudfunctions.net/emailReport');
            this.$q.loading.show({
                delay: 350, // ms
            });
            setTimeout(() => {
                this.$q.loading.hide();
            }, 1200);
        },
        resetCounts(){
            Dialog.create({
                title: 'Confirm Reset Counts',
                message: 'Are you sure? Refresh your page afterwards!',
                ok: 'Yes',
                cancel: 'No'
            }).then(site.resetCounts)
        }
    },
};
</script>
