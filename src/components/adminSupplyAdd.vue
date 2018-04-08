<template>
    <div style="padding:18px;">
        <big>
            Supply Editor
        </big>
        <div class="column items-stretch">
            <br/><br>

            <q-input v-model="name"
                     type="text"
                     float-label="Name"
                     placeholder=""
            /> <br/> <br/>
            <q-select v-model="category"
                     float-label="Category"
                     :options="options"
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
import { required, minLength } from 'vuelidate/lib/validators';

export default {
    props: ['site'],
    data() {
        return {
            name: '',
            category: '',
            options: [
                {
                    label: "medical",
                    value: "medical"
                },
                {
                    label: "kitchen",
                    value: "kitchen"
                },
                {
                    label: "cleaning",
                    value: "cleaning"
                },
                {
                    label: "clothing",
                    value: "clothing"
                },
                {
                    label: "misc",
                    value: "misc"
                },
                {
                    label: "resources",
                    value: "resources"
                },
                {
                    label: "forms",
                    value: "forms"
                },
            ]
        };
    },
    mounted() {
        const { site } = this;
        if (!site) return;

        if (site.name) this.name = site.name;
        if (site.category) this.category = site.category;
    },
    watch: {
        site() {
            const { site } = this;
            if (!site) return;

            if (site.name) this.name = site.name;
            if (site.category) this.category = site.category;
        }
    },
    methods: {
        submit() {
            this.$emit('submit', {
                name: this.name,
                category: this.category
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
            required
        }
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
