<template>
    <q-modal maximized v-model="open" v-if="open">
        <q-modal-layout>
            <q-toolbar slot="header">
                <q-btn
                    flat
                    round
                    dense
                    @click=close
                    icon="keyboard_arrow_left"
                />
                <q-toolbar-title> Supply Form </q-toolbar-title>
            </q-toolbar>
            <supply-list-item :supplies=supplies />
            <q-toolbar slot="footer">
                <q-btn> Submit </q-btn>
            </q-toolbar>
        </q-modal-layout>
    </q-modal>
</template>

<style>
.itemTitle {
    width:75%;
}
</style>

<script>
import supplyListItem from "./supplylistitem"

export default {
    name: '',
    components: {
        supplyListItem
    },
    props: ['open', 'close'],
    data() {
        return {
            zsubscriptions: ['org/egan'],
            opened: this.open
        };
    },
    computed: {
        supplies() {
            try {
                return this.zsubData['org/egan'].supplies
            } catch(e) {
                console.log("not found ")
                return []
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
    },
};
</script>
