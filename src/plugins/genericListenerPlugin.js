import lodash from "lodash"
// import { isArray } from "util";

function validateListenToProperty(listenTo){
    if(lodash.isString(listenTo))
        return true

    return lodash.isArray(listenTo) && lodash.every(listenTo, lodash.isString)
}

export default {
    install(Vue, { sub, unsub }) {
        if(!lodash.isFunction(sub) || !lodash.isFunction(unsub))
            return

        Vue.mixin({
            mounted() {
                const { zsubscriptions } = this;
                if(validateListenToProperty(zsubscriptions)) {
                    sub(this, lodash.isArray(zsubscriptions) ? zsubscriptions : [zsubscriptions])
                }
            },
            data() {
                return {
                    zsubData: null
                }
            },
            watch: {
                zsubscriptions(zsubscriptions) {
                    unsub(this)
                    if(validateListenToProperty(zsubscriptions)) {
                        sub(this, lodash.isArray(zsubscriptions) ? zsubscriptions : [zsubscriptions])
                    }
                }
            },
            beforeDestroy() {
                unsub(this)
            }
        })
    }
}
