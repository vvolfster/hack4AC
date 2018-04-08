<template>
    <div class="quickNum">
        <div class="text-center">
            <div class="custom-title">{{this.label}}</div>
        </div>
        <div class="flex justify-around">
            <q-btn round
                icon="fas fa-minus"
                color="primary"
                @click="decrement"></q-btn>
            <q-input v-model="val"
                    min=0
                    type="number"
                    class="col-6 quickNum--value">
            </q-input>
            <q-btn round
                icon="fas fa-plus"
                color="primary"
                @click="increment"></q-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: ['value', 'label'],
    data() {
        return {
            val: 0,
        };
    },
    computed: {},
    created() {},
    mounted() {
        console.log(this.val, this.value);
        this.val = this.value;
    },
    watch: {
        // whenever question changes, this function will run
        val(oldVal, newVal) {
            this.emitChange(newVal);
        },
    },
    methods: {
        emitChange() {
            this.$emit('input', this.val);
        },
        decrement() {
            this.val = this.val - 1;
        },
        increment() {
            this.val = this.val + 1;
        },
    },
};
</script>

<style scoped>
    .quickNum {
        padding: 8px;
    }
    .quickNum--value {
        padding: 8px;
        width: 50%;
    }
    .custom-title {
        font-weight: bold;
        font-size: 22px;
        margin-top: 10px;
    }
</style>
