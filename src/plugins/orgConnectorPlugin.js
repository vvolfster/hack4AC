export default {
    install(Vue, store) {
        Vue.mixin({
            computed: {
                currentOrgId() {
                    return store.getters['users/currentOrg'];
                },
                orgUserData() {
                    return store.getters['currentOrg/myUserData'];
                },
            },
            mounted() {
                if (!this.isOrgConnectorPluginInstance) return;

                const currentOrgId = store.getters['currentOrg/id'];
                store.dispatch('currentOrg/setId', currentOrgId);
            },
            watch: {
                currentOrgId(v) {
                    if (!this.isOrgConnectorPluginInstance) return;

                    const currentOrgId = store.getters['currentOrg/id'];
                    if (currentOrgId !== v) store.dispatch('currentOrg/setId', v);
                },
            },
        });
    },
};
