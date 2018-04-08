import { db, mutationTypes as M } from './common';

const actions = {
    setId({ state, commit, dispatch }, id) {
        return new Promise(resolve => {
            commit(M.SET_ID, id);

            const { miniState } = state;
            if (miniState.ref && miniState.fn) {
                miniState.ref.off('value', miniState.fn);
            }

            if (!id) {
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ OH GAWD BAD ERROR HAPPEN POTENTIAL @@@@@@@@@@@@@@@@");
                return resolve();
            }

            const fn = snap => dispatch('setData', snap.val());
            const ref = db.ref(`org/${id}`);
            ref.on('value', fn);

            commit(M.SET_MINI_STATE_FN, fn);
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
