import Vue from "vue"

console.log("!!!!!!!!!!!!!!! INIT USER STATE !!!!!!!!!!!!!!!!", JSON.stringify(Vue.fbAuthenticatedUser, null, 2))
const state = {
    currentUser: Vue.fbAuthenticationUser
}

export default state;
