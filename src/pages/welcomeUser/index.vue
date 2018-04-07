<template>
    <div>
        <div>
             <br/> <br/>
            <q-input v-model="firstname" type="tel" float-label="First Name" placeholder="First Name"
                v-on:input="$v.firstname.$touch"
                :class="{error: $v.firstname.$error, valid: $v.firstname.$dirty && !$v.firstname.$invalid}" /> <br/> <br/>
            <q-input v-model="lastname" type="tel" float-label="Last Name" placeholder="Last Name"
                v-on:input="$v.lastname.$touch"
                :class="{error: $v.lastname.$error, valid: $v.lastname.$dirty && !$v.lastname.$invalid}" /> <br/> <br/>
            <q-input v-model="mail" float-label="Email" placeholder="abc@gmail.com"
                v-on:input="$v.mail.$touch"
                :class="{error: $v.mail.$error, valid: $v.mail.$dirty && !$v.mail.$invalid}" /> <br/> <br/>
            <q-input v-model="telephone" float-label="Telephone" placeholder="541xxxxxxx"
                v-on:input="$v.telephone.$touch"
                :class="{error: $v.telephone.$error, valid: $v.telephone.$dirty && !$v.telephone.$invalid}" /> <br/> <br/>
        </div>
    </div>
</template>
<script>
import { email, numeric, required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            firstname: "",
            lastname: "",
            mail: "",
            telephone: ""
        };
    },
    validations: {
        firstname: {
            required,
            minLength: minLength(2)
        },
        lastname: {
            required,
            minLength: minLength(2)
        },
        mail: {
            required,
            email
        },
        telephone: {
            required,
            numeric,
            minLength: minLength(9),
            maxLength: maxLength(9),
        }
    }
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
  background: #FDD;
}

.error:focus {
  outline-color: #F99;
}

.valid {
  border-color: #5A5;
  background: #EFE;
}

.valid:focus {
  outline-color: #8E8;
}
</style>
