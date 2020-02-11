/*
包含N个reducer函数：根据老state和指定action返回新state
 */
import {combineReducers} from "redux";
import {GET_USERINFO_SUCCESS, SET_NEW_DATALIST_SUCCESS, SET_NEW_NOTE_SUCCESS} from "./action-types";


//产生user状态的reducer
const initUser={
    username:'',
    id:0,
    email:'',
}
const initNote = {
    id:0,
    query_key:'',
    content:'',
}
const initList={
    type:'',
    data:[]
}
function user(state=initUser,action) {
    switch(action.type){
        case GET_USERINFO_SUCCESS:
            return action.data
        default:
            return state
    }
}
function note(state=initNote,action) {
    switch(action.type){
        case SET_NEW_NOTE_SUCCESS:
            return action.data
        default:
            return state
    }
}
function list(state=initList,action){
    switch(action.type){
        case SET_NEW_DATALIST_SUCCESS:
            return action.data
        default:return state
    }
}
export default combineReducers({
    user,
    note,
    list
})
//向外暴露的状态的结构为：{user:{},yyy:0}