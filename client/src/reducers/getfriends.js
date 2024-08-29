
const friendreducer = (state={data:null,},action) =>{
    switch (action.type) {
        case 'GET_ALL_FRIENDS':
            return {...state,data:action.payload} 
        case 'HANDLE_FRIENDS':
            return{...state}     
        default:
            return {...state}
    }
}

export default friendreducer