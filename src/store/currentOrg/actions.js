import { db, mutationTypes as M } from "./common"

const miniState = {
    ref: null,
    fn: null
}

const actions = {
    setId({ commit, dispatch }, id){
        commit(M.SET_ID, id);
        if(miniState.ref && miniState.fn){
            miniState.ref.off("value", miniState.fn)
        }

        if(!id)
            return

        if(!miniState.fn)
            miniState.fn = (snap) => dispatch("setData", snap.val())

        miniState.ref = db.ref(`org/${id}`)
        miniState.ref.on("value", miniState.fn)
    },
    setData({ commit }, data) {
        commit(M.SET_DATA, data)
    }
}

export default actions;
