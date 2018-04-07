// import Vue from "vue"

// const fbApp = Vue.fbApps.app;
// const db = fbApp.database()

// export function PathMapEntry({ path, requester, dispatch }) {
//     this.path = path;
//     this.ref = db.ref(path);
//     this.requesters = [requester];
//     const onValue = (snap) => {
//         const data = snap.val()
//         dispatch("setData", { path, data })
//         this.requesters.forEach((r) => {
//             if(!r)
//                 return

//             if(!r.zsubData){
//                 r.zsubData = { [path]: data }
//             }
//             else {
//                 Vue.set(r.zsubData, path, data)
//             }
//         })
//     }

//     this.ref.on("value", onValue)
//     this.off = () => this.ref.off("value", onValue)
//     return this;
// }
export const otherStuff = {}

export const mutationTypes = {
    UPDATE_USER_DETAILS: "UPDATE_USER_DETAILS"
}

