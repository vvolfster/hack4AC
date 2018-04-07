<template>
  <q-page class="flex flex-center">
      option contains:
        suppliesNeeded
        incidents
        userCard
        <countCmp></countCmp>
  </q-page>
</template>

<script>
import countCmp from "components/count"

export default {
    components: {
        countCmp
    },
    name: 'PageIndex',
};
</script>

<style scoped>

</style>
