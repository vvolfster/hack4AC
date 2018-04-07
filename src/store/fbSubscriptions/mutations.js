import * as M from "./mutationTypes"

const mutations = {
    [M.PATHMAP_ADD_REQUESTER](state, { requester, path }){
        state.pathMap[path].requesters.push(requester)
    },
    [M.PATHMAP_REMOVE_REQUSTER](state, { requester, path }){
        const { pathMap } = state
        const mapEntry = pathMap[path];
        const idx = mapEntry.requesters.indexOf(requester);
        if(idx !== -1)
            mapEntry.requesters.splice(idx, 1);
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

export default mutations
