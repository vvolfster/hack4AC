<template>
    <q-page class="flex ">
    </q-page>
</template>

<style>

</style>

<script>
export default {
    name: 'ItemModal',
    props: [''],
    data() {
        return {
            zsubscriptions: ['org/egan'],
        };
    },
    computed: {
        sites() {
            try {
                console.log(this.zsubData['org/egan'].site);
                return this.zsubData['org/egan'].site;
            } catch (e) {
                return {};
            }
        },
    },
    created() {},
    mounted() {},
    methods: {
        clickSite(site) {
            console.log('clicked site', site);
        },
    },
};
</script>
