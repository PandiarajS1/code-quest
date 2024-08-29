import * as api from '../api'

export const getloginhistory = () => async(dispatch) => {
    try {
        const {data} = await api.getloginhistory()
        dispatch({type:'LOGIN_HISTORY',payload:data})
    } catch (error) {
        console.log(error)
    }

} 