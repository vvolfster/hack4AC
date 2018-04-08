import Vue from "vue"

const fbApp = Vue.fbApps.app;
const database = fbApp.database();

export const db = database;
export const mutationTypes = {
    UPDATE_USER_DETAILS: "UPDATE_USER_DETAILS",
    SET_CURRENT_USER: "SET_CURRENT_USER",
    SET_SELECTED_ORG_ID: "SET_SELECTED_ORG_ID"
}

