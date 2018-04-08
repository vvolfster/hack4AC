<template>
    <div style="padding:18px;">
        <big>
            Site Editor
        </big>
        <div class="column items-stretch">
            <br/><br>

            <q-input v-model="title"
                     type="text"
                     float-label="Title"
                     placeholder="Title"
                     v-on:input="$v.title.$touch"
                     :class="{error: $v.title.$error, valid: $v.title.$dirty && !$v.title.$invalid}"
            /> <br/> <br/>
            <q-input v-model="streetAddress"
                     type="text"
                     float-label="Street Address"
                     placeholder="123 Main St"
                     v-on:input="$v.streetAddress.$touch"
                     :class="{error: $v.streetAddress.$error, valid: $v.streetAddress.$dirty && !$v.streetAddress.$invalid}"
            /> <br/> <br/>
            <q-input v-model="maxGuests"
                     float-label="Maxium Guests"
                     v-on:input="$v.maxGuests.$touch"
                     :class="{error: $v.maxGuests.$error, valid: $v.maxGuests.$dirty && !$v.maxGuests.$invalid}"
            /> <br/> <br/>
            <q-input v-model="maxPets"
                     float-label="Maximum Pets"
                     placeholder="0"
                     v-on:input="$v.maxPets.$touch"
                     :class="{error: $v.maxPets.$error, valid: $v.maxPets.$dirty && !$v.maxPets.$invalid}"
            /> <br/> <br/>
            <span>Site is ADA</span>
            <q-checkbox v-model="supportsADA"
                        float-label="ADA Site"
                        v-on:input="$v.supportsADA.$touch"
                        :class="{error: $v.supportsADA.$error, valid: $v.supportsADA.$dirty && !$v.supportsADA.$invalid}"
            /> <br/> <br/>
            <span>Child Site</span>
            <q-checkbox v-model="isChildSite"
                        float-label="Child Site"
                        v-on:input="$v.isChildSite.$touch"
                        :class="{error: $v.isChildSite.$error, valid: $v.isChildSite.$dirty && !$v.isChildSite.$invalid}"
            /> <br/> <br/>
            <q-btn @click.stop="submit"
                   :disable="formIsInvalid"
                   :class="!formIsInvalid ? `bg-green text-white` : `bg-grey-5 text-grey-2`"

                   size="lg">
                Submit
            </q-btn>
        </div>
    </div>
</template>
<script>
import { numeric, required, minLength } from 'vuelidate/lib/validators';

export default {
    props: ['site'],
    data() {
        return {
            title: '',
            streetAddress: '',
            maxGuests: '',
            maxPets: '',
            supportsADA: false,
            isChildSite: false,
        };
    },
    mounted() {
        const { site } = this;
        if (!site) return;

        if (site.title) this.title = site.title;
        if (site.streetAddress) this.streetAddress = site.streetAddress;
        if (site.guest.max) this.maxGuests = site.guest.max;
        if (site.pets.max) this.maxPets = site.pets.max;
        if (site.supports.ADA) this.supportsADA = site.supports.ADA;
        if (site.supports.ageGroup === 'child') this.isChildSite = true;
    },
    watch: {
        site() {
            const { site } = this;
            if (!site) return;

            if (site.title) this.title = site.title;
            if (site.streetAddress) this.streetAddress = site.streetAddress;
            if (site.guest.max) this.maxGuests = site.guest.max;
            if (site.pets.max) this.maxPets = site.pet.max;
            if (site.supports.ADA) this.supportsADA = site.supports.ADA;
            if (site.supports.ageGroup === 'child') this.isChildSite = true;
        },
    },
    methods: {
        submit() {
            // eslint-disable-next-line
            const petSupport = this.maxPets > 0 ? true : false;
            const ageGroup = this.isChildSite ? "child" : "adult"
            this.$emit('submit', {
                title: this.title,
                streetAddress: this.streetAddress,
                maxGuests: this.maxGuests,
                maxPets: this.maxPets,
                supportsADA: this.supportsADA,
                supportsPets: petSupport,
                ageGroup
            });
        },
    },
    computed: {
        formIsInvalid() {
            const { $v } = this;
            return $v.title.$invalid || $v.streetAddress.$invalid || $v.maxGuests.$invalid || $v.maxPets.$invalid;
        },
    },
    validations: {
        title: {
            required,
            minLength: minLength(5),
        },
        streetAddress: {
            required,
            minLength: minLength(5),
        },
        maxGuests: {
            required,
            numeric,
        },
        maxPets: {
            required,
            numeric,
        },
        supportsADA: {},
        supportsPets: {},
        ageGroup: {},
        isChildSite: {}
    },
};
</script>
<style scoped>
input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
}

.error {
    border-color: red;
    background: #fdd;
}

.error:focus {
    outline-color: #f99;
}

.valid {
    border-color: #5a5;
    background: #efe;
}

.valid:focus {
    outline-color: #8e8;
}
</style>
