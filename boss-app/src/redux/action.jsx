export const increment = data => ({type: xxx, data})


// 异步action creator(返回一个函数)                 
export const incrementAsync = data => {
    return dispatch => {
        setTimeout(() => {
            dispatch(increment(data))
        }, 1000)
    }
}