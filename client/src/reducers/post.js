const postreducer = (state={data:null},action) => {
    switch (action.type) {
        case 'UPLOAD_POST':
            return {...state}
        case 'GET_ALL_POST':    
        return {...state,data:action.payload};
        case 'UPLOAD_COMMENT':
            return {...state}    
        default:
            return state
    }
}

export default postreducer