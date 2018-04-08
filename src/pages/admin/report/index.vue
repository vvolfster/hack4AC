<template>
    <q-page class="flex flex-center">
        <q-btn label="Email Yesterday's Report"
               @click="generateReport">
        </q-btn>
    </q-page>
</template>

<style>

</style>

<script>
import axios from 'axios';

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
    },
};
</script>
