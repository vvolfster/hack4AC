/* eslint-disable global-require */
import Vue from "vue";
import Vuex from "vuex";
import svc from "shrimp-vue-components";

Vue.use(svc, {
    cms: {
        disable: true
    },
    firebaseAuthentication: {
        fbConfig: {
            apiKey: "AIzaSyBLsueqLNsELcsooFYlqVWHI8wmBzwf9gg",
            authDomain: "warmingn-5dbc7.firebaseapp.com",
            databaseURL: "https://warmingn-5dbc7.firebaseio.com",
            projectId: "warmingn-5dbc7",
            storageBucket: "warmingn-5dbc7.appspot.com",
            messagingSenderId: "435300133523"
        }
    }
})


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        fbSubscriptions: require("./fbSubscriptions").default,
        users: require('./users').default,
        currentOrg: require('./currentOrg').default,
        site: require('./site').default,
        org: require('./org').default
    }
});

export default store;
