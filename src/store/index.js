import Vue from "vue";
import Vuex from "vuex";
import example from "./module-example";
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
        example
    }
});

console.log("Initializing store", Vue.fbApps)
export default store;
