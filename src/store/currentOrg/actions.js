import { db, mutationTypes as M } from './common';

const miniState = {
    ref: null,
    fn: null,
};

const actions = {
    setId({ commit, dispatch }, id) {
        return new Promise(resolve => {
            commit(M.SET_ID, id);
            if (miniState.ref && miniState.fn) {
                miniState.ref.off('value', miniState.fn);
            }

            if (!id) return resolve();

            miniState.fn = snap => dispatch('setData', snap.val());
            miniState.ref = db.ref(`org/${id}`);
            miniState.ref.on('value', miniState.fn);
            return resolve();
        });
    },
    setData({ commit }, data) {
        commit(M.SET_DATA, data);
        return Promise.resolve()
    },
};

export default actions;
