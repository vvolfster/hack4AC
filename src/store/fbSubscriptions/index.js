import Vue from "vue"

const fbApp = Vue.fbApps.app;
const db = fbApp.database()

const M = {
    PATHMAP_ADD_REQUESTER: "ADD_REQUESTER",
    PATHMAP_REMOVE_REQUSTER: "REMOVE_REQUESTER",
    PATHMAP_ADD_ENTRY: "PATHMAP_ADD_ENTRY",
    PATHMAP_REMOVE_ENTRY: "PATHMAP_REMOVE_ENTRY",
    INSTANCEMAP_ADD: "INSTANCEMAP_ADD",
    INSTANCEMAP_REMOVE: "INSTANCEMAP_REMOVE",
    DATA_SET: "DATA_SET"
}

function PathMapEntry({ path, requester, dispatch }) {
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

const startingState = {
    // const map = {
    //     path: {
    //         ref: fbRef,
    //         listeners: []
    //     }
    // }
    pathMap: {},
    // <component, path>
    instanceMap: new Map(),
    data: {}
}

function subToPath({ state, commit, dispatch, requester, path }) {
    const { pathMap, data } = state;
    const mapEntry = pathMap[path];
    if(mapEntry) {
        commit(M.PATHMAP_ADD_REQUESTER, { requester, path })
        const val = data[path]
        if(!requester.zsubData) {
            requester.zsubData = { [path]: val }
        }
        else {
            requester.zsubData[path] = val
        }
    }
    else {
        commit(M.PATHMAP_ADD_ENTRY, new PathMapEntry({ path, requester, dispatch }))
        commit(M.INSTANCEMAP_ADD, { requester, path })
    }
}


const mutations = {
    [M.PATHMAP_ADD_REQUESTER](state, { requester, path }){
        state.pathMap[path].listeners.push(requester)
    },
    [M.PATHMAP_REMOVE_REQUSTER](state, { requester, path }){
        const { pathMap } = state
        const mapEntry = pathMap[path];
        const idx = mapEntry.listeners.indexOf(requester);
        if(idx !== -1)
            mapEntry.listeners.splice(idx, 1);
    },
    [M.PATHMAP_ADD_ENTRY](state, entry) {
        const { pathMap } = state
        pathMap[entry.path] = entry
    },
    [M.PATHMAP_REMOVE_ENTRY](state, { path }) {
        const { pathMap } = state
        const mapEntry = pathMap[path]
        mapEntry.ref.off();
        pathMap[path] = null;
    },
    [M.DATA_SET](state, { path, data }){
        state.data[path] = data
    },
    [M.INSTANCEMAP_ADD](state, { requester, path }){
        const { instanceMap } = state
        const instanceMapEntry = instanceMap[requester]
        if(instanceMapEntry)
            instanceMapEntry.push(path)
        else
            instanceMap[requester] = [path]
    },
    [M.INSTANCEMAP_REMOVE](state, { requester }){
        state.instanceMap[requester] = null
    }
}

const actions = {
    subscribe({ state, commit, dispatch }, { requester, subs }) {
        subs.forEach(path => subToPath({ state, commit, dispatch, requester, path }))
    },
    unsubscribe({ state, commit }, { requester }) {
        // go thru the map & find this requester everywhere!
        const { instanceMap, pathMap } = state
        const instanceMapEntry = instanceMap[requester];
        if(!instanceMapEntry){
            return;
        }

        instanceMapEntry.forEach((path) => {
            commit(M.PATHMAP_REMOVE_REQUSTER, { path, requester })
            const mapEntry = pathMap[path];
            if(!mapEntry.listeners.length){
                commit(M.PATHMAP_REMOVE_ENTRY, { path })
            }
        })
        commit(M.INSTANCEMAP_REMOVE, { requester })
    },
    setData({ commit }, { path, data }){
        commit(M.DATA_SET, { path, data })
    }
}

export default {
    namespaced: true,
    state: startingState,
    actions,
    mutations,
    getters: {
        data: (state) => state.data
    }
}
