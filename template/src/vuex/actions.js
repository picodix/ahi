// api
// import api from '../api'
import * as types from './mutation-types'

// app methods
export const saveSize = ({commit}, size) => {
    commit(types.RESIZE, size)
}
