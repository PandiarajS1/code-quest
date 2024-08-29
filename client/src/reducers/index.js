import {combineReducers} from "redux"
import authreducer from "./auth"
import currentuserreducer from "./currentuser";
import usersreducer from "./users";
import questionreducer from "./question";
import postreducer from "./post";
import friendreducer from './getfriends'
import loginhistoryreducer from './loginHistory'

export default combineReducers({
    authreducer,
    currentuserreducer,
    usersreducer,
    questionreducer,
    postreducer,
    friendreducer,
    loginhistoryreducer
});