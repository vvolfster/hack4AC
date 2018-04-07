import moment from "moment";
import lodash from "lodash";
import Vuelidate from "vuelidate";
import { AddressbarColor } from "quasar";
import genericListenerPlugin from "./genericListenerPlugin";

// leave the export, even if you don't use it
// export default ({ app, router, Vue }) => {
export default ({ Vue, store }) => {
    // const { data, beforeCreate, created, methods } = init;
    AddressbarColor.set("#a2e3fa");
    Vue.prototype.moment = moment;
    Vue.prototype.lodash = lodash;
    Vue.config.productionTip = false;
    Vue.use(Vuelidate);
    Vue.use(genericListenerPlugin, {
        sub: (requester, subs) => store.dispatch("fbSubscriptions/subscribe", { requester, subs }),
        unsub: requester => store.dispatch("fbSubscriptions/unsubscribe", { requester })
    });

    // router.beforeEach((to, from, next) => {
    //     const firebaseX = fbAppAuth;
    //     const { currentUser } = firebaseX.auth();
    //     console.log('router currentUser', currentUser);
    //     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    //     if (requiresAuth && !currentUser) {
    //         console.log("you weren't logged in..", firebaseX.auth().currentUser);
    //         next('login');
    //     } else {
    //         // else if (!requiresAuth && currentUser) next('pools');
    //         console.log('router ELSE', to);
    //         next();
    //     }
    // });

    // app.beforeCreate = beforeCreate
    // app.data = data
    // app.methods = methods
    // app.created = created
};
