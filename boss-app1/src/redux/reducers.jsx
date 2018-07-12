import {combineReducers} from 'redux'  // 合并多个reducer函数
function counter(state = 0, action) {
    console.log('counter', state, action)
    return state
}

export default combineReducers({
    counter
})