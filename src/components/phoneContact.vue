<template>
    <div v-if=!contact></div>
    <div v-else id="root">
        <a v-bind:href="'tel:' + contact.phone"
        class="link flex flex-center q-pa-sm">
            <div>
                <q-icon name="phone" />
            </div>
            <div v-if="role" class="q-ml-sm">{{ role }}:</div>
            <div v-if="contact.firstName" class="q-ml-sm">{{ contact.firstName }}</div>
            <div class="q-ml-sm">{{ formatPhoneNumber(contact.phone) }}</div>
        </a>
    </div>
</template>

<script>
export default {
    name: "phoneContact",
    components: {},
    props: ["role", "contact", "omitFirstName", "phone"],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {
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
