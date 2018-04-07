<template>
  <!-- home -->
  <q-page class="flex flex-center">
        <pre>
            {{ JSON.stringify(zsubData, null, 2) }}
        </pre>
  </q-page>
</template>

<style>
</style>

<script>
export default {
    name: 'PageIndex',
    data() {
        return {
            zsubscriptions: ["org/egan"]
        }
    }
};
</script>
