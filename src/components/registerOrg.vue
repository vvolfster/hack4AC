<template>
    <div>
        <div>
            Update Organization Information
        </div>
        <div class="column items-stretch" >
            <br/> <br/>
            <!-- <p> Add Your Logo </p>
            <q-uploader :url="url" /> -->
            <q-input v-model="orgName"
                     type="tel"
                     float-label="Organization"
                     placeholder="Organization"
                     v-on:input="$v.orgName.$touch"
                     :class="{error: $v.orgName.$error, valid: $v.orgName.$dirty && !$v.orgName.$invalid}"
            /> <br/> <br/>
            <q-input v-model="region"
                     type="tel"
                     float-label="Region"
                     placeholder="Region"
                     v-on:input="$v.region.$touch"
                     :class="{error: $v.region.$error, valid: $v.region.$dirty && !$v.region.$invalid}"
            /> <br/> <br/>
            <q-input v-model="telephone"
                     float-label="Telephone"
                     placeholder="541xxxxxxx"
                     v-on:input="$v.telephone.$touch"
                     :class="{error: $v.telephone.$error, valid: $v.telephone.$dirty && !$v.telephone.$invalid}"
            /> <br/> <br/>
            <q-input v-model="hqAddress"
                     type="tel"
                     float-label="Headquarter Address"
                     placeholder="Headquarter Address"
                     v-on:input="$v.hqAddress.$touch"
                     :class="{error: $v.hqAddress.$error, valid: $v.hqAddress.$dirty && !$v.hqAddress.$invalid}"
            /> <br/> <br/>
            <!--<q-input v-model="pContact"
                     type="tel"
                     float-label="Primary Contact"
                     placeholder="Primary Contact"
                     v-on:input="$v.pContact.$touch"
                     :class="{error: $v.pContact.$error, valid: $v.pContact.$dirty && !$v.pContact.$invalid}"
            /> <br/> <br/>-->
            <q-input v-model="aboutOrg"
                     type="tel"
                     float-label="About Organisation"
                     placeholder="About Organisation"
                     v-on:input="$v.aboutOrg.$touch"
                     :class="{error: $v.aboutOrg.$error, valid: $v.aboutOrg.$dirty && !$v.aboutOrg.$invalid}"
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
import { numeric, required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            orgName: "",
            region: "",
            telephone: "",
            hqAddress: "",
            // pContact: "",
            aboutOrg: ""
        };
    },
    computed: {
        formIsInvalid() {
            const { $v } = this
            return $v.orgName.$invalid || $v.region.$invalid || $v.telephone.$invalid || $v.hqAddress.$invalid || $v.aboutOrg.$invalid
        }
    },
    methods: {
        submit() {
            this.$emit("submit", {
                orgName: this.orgName,
                region: this.region,
                phone: this.telephone,
                hqAddress: this.hqAddress,
                // pContact: this.pContact,
                aboutOrg: this.aboutOrg
            })
        }
    },
    validations: {
        orgName: {
            required,
            minLength: minLength(2)
        },
        region: {
            required,
            minLength: minLength(2)
        },
        telephone: {
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(10),
        },
        hqAddress: {
            required,
            minLength: minLength(2)
        },
        aboutOrg: {
            required,
            minLength: minLength(2)
        },
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
