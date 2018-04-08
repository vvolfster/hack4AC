/* eslint-disable prefer-destructuring */
import Vue from "vue"

const app = Vue.fbApps.app;

export const db = app.database()
export const mutationTypes = {
    SET_ID: "SET_ID",
    SET_DATA: "SET_DATA",
    SET_MINI_STATE_FN: "SET_MINI_STATE_FN",
    SET_MINI_STATE_REF: "SET_MINI_STATE_REF"
}

