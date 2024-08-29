const currentuserpostreducer = (state={data:null,},action) =>{
    switch (action.type) {
        case 'GET_CURRENT_USER':
            return {...state,data:action.payload}    
        default:
            return {...state}
    }
}

export default currentuserpostreducer