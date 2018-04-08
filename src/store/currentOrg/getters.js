
const getters = {
    value: (state) => state.data,
    myUserData(state, globalState) {
        if(!state.id || !state.data)
            return null

        console.log(globalState)
        return true
    }
}

export default getters;
