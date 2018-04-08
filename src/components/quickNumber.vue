<template>
  <div class="row">
      <q-btn round icon="fas fa-minus"></q-btn>
      <q-input v-model="val" type="number" class="col-6">
      </q-input>
      <q-btn round icon="fas fa-plus"></q-btn>
  </div>
</template>

<script>
export default {
    name: "",
    components: {},
    props: ["value"],
    data() {
        return {
            val: 0
        };
    },
    computed: {

    },
    created() {},
    mounted() {
        this.val = this.value
    },
    methods: {
        emitChange(){
            this.$emit('input', this.val)
        }
    }
};
</script>

<style scoped>

</style>
