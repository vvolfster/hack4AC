import { PathMapEntry, mutationTypes as M } from "./common"

const mutations = {
    [M.PATHMAP_ADD_REQUESTER](state, { requester, path }){
        const pathEntry = state.pathMap[path]
        if(!pathEntry){
            console.warn(`Tried to add requester to null path: ${path}`)
        }

        pathEntry.requesters.push(requester)
    },
    [M.PATHMAP_REMOVE_REQUSTER](state, { requester, path }){
        const pathEntry = state.pathMap[path];
        if(!pathEntry) {
            console.warn(`Tried to remove requester from null path: ${path}`)
            return
        }

        const idx = pathEntry.requesters.indexOf(requester);
        if(idx !== -1)
            pathEntry.requesters.splice(idx, 1);
    },
    [M.PATHMAP_ADD_ENTRY](state, entry) {
        if(!(entry instanceof PathMapEntry))
            throw new Error("Tried to add non PathMapEntry object to pathMap")

        state.pathMap[entry.path] = entry
    },
    [M.PATHMAP_REMOVE_ENTRY](state, { path }) {
        const { pathMap } = state
        const mapEntry = pathMap[path]
        if(!mapEntry){
            console.warn(`Tried to remove PathMapEntry from null path: ${path}`)
            return
        }

        mapEntry.ref.off();
        pathMap[path] = null;
    },
    [M.DATA_SET](state, { path, data }){
        if(typeof path !== "string" || !path.length)
            throw new Error("Tried to set data to non-string path!")

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
