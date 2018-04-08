<template>
    <div>
        <div>
            Update profile
        </div>
        <div class="column items-stretch" >
            <br/><br>
            <q-input v-model="firstname"
                     type="tel"
                     float-label="First Name"
                     placeholder="First Name"
                     v-on:input="$v.firstname.$touch"
                     :class="{error: $v.firstname.$error, valid: $v.firstname.$dirty && !$v.firstname.$invalid}"
            /> <br/> <br/>
            <q-input v-model="lastname"
                     type="tel"
                     float-label="Last Name"
                     placeholder="Last Name"
                     v-on:input="$v.lastname.$touch"
                     :class="{error: $v.lastname.$error, valid: $v.lastname.$dirty && !$v.lastname.$invalid}"
            /> <br/> <br/>
            <q-input v-model="mail"
                     float-label="Email"
                     placeholder="abc@gmail.com"
                     v-on:input="$v.mail.$touch"
                     :class="{error: $v.mail.$error, valid: $v.mail.$dirty && !$v.mail.$invalid}"
            /> <br/> <br/>
            <q-input v-model="telephone"
                     float-label="Telephone"
                     placeholder="541xxxxxxx"
                     v-on:input="$v.telephone.$touch"
                     :class="{error: $v.telephone.$error, valid: $v.telephone.$dirty && !$v.telephone.$invalid}"
            /> <br/> <br/>
            <q-btn
                @click.stop="submit"
                :disable="formIsInvalid"
                :class="!formIsInvalid ? `bg-green text-white` : `bg-grey-5 text-grey-2`"
                size="lg"
            >
                Submit
            </q-btn>
        </div>
    </div>
</template>
<script>
import { email, numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
    props: ['user'],
    data() {
        return {
            firstname: '',
            lastname: '',
            mail: '',
            telephone: '',
        };
    },
    mounted() {
        const { user } = this;
        if (!user) return;

        if (user.firstName) this.firstname = user.firstName;
        if (user.lastName) this.lastname = user.lastName;
        if (user.email) this.mail = user.email;
        if (user.phone) this.telephone = user.phone;
    },
    watch: {
        user() {
            const { user } = this;
            if (!user) return;

            if (user.firstName) this.firstname = user.firstName;
            if (user.lastName) this.lastname = user.lastName;
            if (user.email) this.mail = user.email;
            if (user.phone) this.telephone = user.phone;
        },
    },
    methods: {
        submit() {
            this.$emit("submit", {
                firstName: this.firstname,
                lastName: this.lastname,
                email: this.mail,
                phone: this.telephone
            })
        }
    },
    computed: {
        formIsInvalid() {
            const { $v } = this
            return $v.firstname.$invalid || $v.lastname.$invalid || $v.mail.$invalid || $v.telephone.$invalid
        }
    },
    validations: {
        firstname: {
            required,
            minLength: minLength(2),
        },
        lastname: {
            required,
            minLength: minLength(2),
        },
        mail: {
            required,
            email,
        },
        telephone: {
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(10),
        },
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
