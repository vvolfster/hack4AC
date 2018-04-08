
const getters = {
    value: (state) => state.data,
    myUserData(state, localGetters, globalState) {
        if(!state.id || !state.data || !state.data.users)
            return null

        const { currentUser } = globalState.users;
        if(!currentUser)
            return null

        const { authId } = currentUser;
        if(!authId)
            return null

        return state.data.users[authId]
    }
}

export default getters;
