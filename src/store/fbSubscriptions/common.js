import Vue from "vue"

const fbApp = Vue.fbApps.app;
const db = fbApp.database()

export function PathMapEntry({ path, requester, dispatch }) {
    this.path = path;
    this.ref = db.ref(path);
    this.requesters = [requester];
    const onValue = (snap) => {
        const data = snap.val()
        dispatch("setData", { path, data })
        this.requesters.forEach((r) => {
            if(!r)
                return

            if(!r.zsubData){
                r.zsubData = { [path]: data }
            }
            else {
                r.zsubData[path] = data
            }
        })
    }

    this.ref.on("value", onValue)
    this.off = () => this.ref.off("value", onValue)
    return this;
}

export const mutationTypes = {
    PATHMAP_ADD_REQUESTER: "ADD_REQUESTER",
    PATHMAP_REMOVE_REQUSTER: "REMOVE_REQUESTER",
    PATHMAP_ADD_ENTRY: "PATHMAP_ADD_ENTRY",
    PATHMAP_REMOVE_ENTRY: "PATHMAP_REMOVE_ENTRY",
    INSTANCEMAP_ADD: "INSTANCEMAP_ADD",
    INSTANCEMAP_REMOVE: "INSTANCEMAP_REMOVE",
    DATA_SET: "DATA_SET"
}

