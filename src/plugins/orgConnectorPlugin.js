export default {
    install(Vue) {
        Vue.mixin({
            computed: {
                currentOrgId() {
                    return this.$store.getters['users/currentOrg']
                },
                orgUserData() {
                    return this.$store.getters['currentOrg/myUserData']
                }
            },
            mounted() {
                const currentOrgId = this.$store.getters['currentOrg/id']
                if(currentOrgId !== this.currentOrgId)
                    this.$store.dispatch('currentOrg/setId', this.currentOrgId);
            },
            watch: {
                currentOrgId(v) {
                    const currentOrgId = this.$store.getters['currentOrg/id']
                    if(currentOrgId !== v)
                        this.$store.dispatch('currentOrg/setId', v);
                }
            }
        })
    }
}
