<template>
    <div class="supplyItem">
        <div>
            <div class="flex justify-end">
                <q-icon
                    name="remove"
                    size="20px"
                    @click.native="decrement"/>
                <q-input v-model="val"
                        align="center"
                        min=0
                        type="number"
                        class="col-2 quickNum--value">
                </q-input>
                <q-icon
                    name="add"
                    size="20px"
                    @click.native="increment"/>
            </div>
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
            if (this.val > 0) {
                this.val = Number(this.val) - 1;
            }
        },
        increment() {
            this.val = Number(this.val) + 1;
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
    }
    .custom-title {
        font-size: 22px;
        margin-top: 10px;
    }
    .supplyItem {
        margin:auto
    }

</style>
