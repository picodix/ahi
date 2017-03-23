import * as types from '../mutation-types'

const state = {
    width: 0,
    height: 0
}

const mutations = {
    [types.RESIZE] (state, payload) {
        state.width = payload.width
        state.height = payload.height
    }
}

export default {
    state,
    mutations
}
