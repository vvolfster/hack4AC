<template>
    <q-page>
        <div v-for="(invite, key) in invites"
             :key="key">
            <q-table :data="tableData" :columns="columns" row-key="name" color="secondary" class="tableClass"/>
        </div>
        <q-page-sticky position="bottom-right"
                       :offset="[18, 18]">
            <q-btn :fab="true"
                   @click="startInvite"
                   color="green"
                   icon="fas fa-plus"
                   label="Invite" />
        </q-page-sticky>
    </q-page>
</template>

<script>
import { Dialog } from 'quasar';
import lodash from 'lodash';
import Constants from '../../../Constants';
import Vue from 'vue';
import { userAdmin } from '../../../storeWriter';

const dialogForm = {
    title: 'Invite User',
    message: 'Enter e-mail',
    prompt: {
        model: '',
    },
    cancel: true,
    preventClose: true,
    color: 'secondary',
};

export default {
    name: "adminInvite",
    props: ['org'],
    data() {
        return {
            columns: [
                { align: "left", name: 'email', label: 'Emali', field: 'email', sortable: true },
                { align: "left", name: 'invited on', label: 'Invited On', field: 'dateCreated', sortable: true },
            ]
        }
    },
    computed: {
        invites() {
            return this.org ? this.org.invites : {};
        },
        tableData() {
            return lodash.toArray(this.invites).filter(d => !d.accepted)
        }
    },
    methods: {
        startInvite() {
            const self = this;
            Dialog.create(dialogForm).then(email => {
                Vue.toast.dismissAll();
                if (!Constants.validateEmail(email)) {
                    Vue.toast.negative(`${email} is not a valid email address`);
                    return;
                }

                // check if the user has already been invited!
                const exists = lodash.find(self.invites, i => i.email === email);
                if (exists) {
                    Vue.toast.warning.notify(`${email} has already been invited`);
                    return;
                }

                userAdmin.inviteUser(email).then(() => Vue.toast.success(`${email} will be invited`))
            });
        },
    },
};
</script>
