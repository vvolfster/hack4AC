<template>
    <!-- Round shaped (only use icon or spinner as content!) with loading state -->
    <q-btn :loading="loading" round icon="map" color="primary" @click="handler">
        <q-spinner-oval slot="loading" />
    </q-btn>
</template>

<script>
export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        handler() {
            this.loading = true;
            // we simulate a delay here:
            setTimeout(() => {
                this.loading = false;
            }, 3000);
        }
    }
}
</script>
