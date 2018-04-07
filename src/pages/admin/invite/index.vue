<template>
    <div>
        <q-btn loading color="primary" fab="true" @click="startInvite" label="Button Label" />
    </div>
</template>

<script>
export default {
    props: ['org'],
    computed: {
        invites() {
            return this.org ? this.org.invites : {};
        },
    },
    methods: {
        startInvite(){

        }
    }
};
</script>
