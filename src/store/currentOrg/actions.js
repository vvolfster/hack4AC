import { db, mutationTypes as M } from './common';
import Vue from "vue"

function fn(snap) {
    if(Vue.store)
        Vue.store.dispatch('currentOrg/setData', snap.val())
    else
        console.error("Tried to dispatch before store was init")
}

const actions = {
    setId({ state, commit }, id) {
        return new Promise(resolve => {
            commit(M.SET_ID, id);

            const { miniState } = state;
            if (miniState.ref) {
                miniState.ref.off('value');
                console.log("ref off")
            }

            if (!id) {
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ OH GAWD BAD ERROR HAPPEN POTENTIAL @@@@@@@@@@@@@@@@");
                return resolve();
            }

            const ref = db.ref(`org/${id}`);
            ref.on('value', fn);
            console.log("ref on")
            commit(M.SET_MINI_STATE_REF, ref);

            return resolve();
        });
    },
    setData({ commit }, data) {
        commit(M.SET_DATA, data);
        return Promise.resolve()
    },
};

export default actions;
