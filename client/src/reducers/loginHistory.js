
const loginhistoryreducer =(state = {data:null},action) => {
    switch (action.type) {
        case 'LOGIN_HISTORY':
            return {...state,data:action.payload}
        default:
            return {...state}
    }
}

export default loginhistoryreducer