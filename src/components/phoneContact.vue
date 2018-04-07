<template>
  <div id="root">
    <a v-bind:href="'tel:' + contact.phone"
       class="flex flex-center q-pa-sm">
        <div>
            <q-icon name="phone" />
        </div>
        <div class="q-ml-sm">{{ role }}:</div>
        <div class="q-ml-sm">{{ contact.firstName }}</div>
        <div class="q-ml-sm">{{ formatPhoneNumber(contact.phone) }}</div>
    </a>
  </div>
</template>

<script>
export default {
    name: "phoneContact",
    components: {},
    props: ["role", "contact"],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {
    // const self = this;
    // this.$nextTick(() => {
    //     try {
    //     } catch (e) {
    //         //
    //     }
    // });
    },
    methods: {
        formatPhoneNumber(number) {
            if (number.length !== 10) {
                return number
            }

            return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6, 10)}`
        }
    }
};
</script>

<style scoped>
    a {
        color: black;
        text-decoration: none;
    }
</style>
