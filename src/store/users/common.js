import Vue from "vue"

const fbApp = Vue.fbApps.app;
const db = fbApp.database();

export const firebase = {
    db,
}

export const mutationTypes = {
    UPDATE_USER_DETAILS: "UPDATE_USER_DETAILS",
    SET_CURRENT_USER: "SET_CURRENT_USER"
}

