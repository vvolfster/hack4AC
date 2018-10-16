<template>
    <div v-if=!contact></div>
    <div v-else
         id="root">
        <q-btn @click="emitClick"
               style="width:90%"
               :label="role + ': ' + contact.firstName"
               icon="phone"
               :size="small ? 'md' : 'lg'"
               flat
               :color="contact.phone === '911' ? 'red' : 'secondary'"

               class="q-ma-md">
            <!-- <div v-if="role"
                 class="q-ml-sm">{{ role }}</div> -->
            <!-- <div v-if="contact.firstName"
                 class="q-ml-sm">{{ contact.firstName }}</div> -->
            <!-- <div class="q-ml-sm">{{ formatPhoneNumber(contact.phone) }}</div> -->
        </q-btn>
    </div>
</template>

<script>
import { openURL } from 'quasar';

export default {
    name: 'phoneContact',
    components: {},
    props: ['role', 'contact', 'omitFirstName', 'phone', 'small', 'flat'],
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        openURL,
        formatPhoneNumber(number) {
            if (number.length !== 10) {
                return number;
            }

            return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6, 10)}`;
        },
        emitClick() {
            this.openURL(`tel:${this.contact.phone}`)
            this.$emit('wasClicked');
        },
    },
};
</script>

<style scoped>
a {
    color: black;
    text-decoration: none;
}
</style>
