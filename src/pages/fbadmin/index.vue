<template>
  <q-page class="flex flex-center">
      <firebaseAdminPanel
        :config="config"
      />
  </q-page>
</template>

<style>
</style>

<script>
import svc from 'shrimp-vue-components';

export default {
    components: {
        firebaseAdminPanel: svc.bigTools.firebaseAdminPanel,
    },
    name: 'PageIndex',
    data() {
        return {
            config: {
                fbConfig: {
                    apiKey: "AIzaSyBLsueqLNsELcsooFYlqVWHI8wmBzwf9gg",
                    authDomain: "warmingn-5dbc7.firebaseapp.com",
                    databaseURL: "https://warmingn-5dbc7.firebaseio.com",
                    projectId: "warmingn-5dbc7",
                    storageBucket: "warmingn-5dbc7.appspot.com",
                    messagingSenderId: "435300133523"
                }
            }
        }
    }
};
</script>
