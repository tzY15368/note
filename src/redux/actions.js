/*
包含n个action creator（异步，同步）
 */

import axios from 'axios'
import BASEURL from '../configs/names'
import cookie from 'react-cookies'
import {
    SET_NEW_NOTE_SUCCESS,
    ERROR_MSG,
    GET_USERINFO_SUCCESS, SET_NEW_DATALIST_SUCCESS
} from "./action-types";

//请求成功的同步action
const authSuccess = (user) =>({type:GET_USERINFO_SUCCESS,data:user})
//错误的同步action
const errorMsg = (msg)=>({type:ERROR_MSG,data:msg})
const setSuccess = (note) =>({type:SET_NEW_NOTE_SUCCESS,data:note})
const setDataListSuccess = (list)=>({type:SET_NEW_DATALIST_SUCCESS,data:list})
//注册异步action
export const GetUserInfo = () =>{
    return async dispatch =>{
        //发送注册的异步请求
        const url = BASEURL+'/user'
        const token = cookie.load('token')
        if(token!==undefined) {
            console.log('willstart axios;'+url)
            const response = await axios.get(url, {
                headers:{Authorization:token}
            })
            //console.log('response:'+JSON.stringify(response))
            const result = response.data
            if (result.code === 1001) {
                //分发成功action
                dispatch(authSuccess(result.data))
            } else {
                //分发失败提示
                dispatch(errorMsg(result.data))
            }
        }
    }
}
export const SetNewNote = (note) =>{
    return dispatch =>{
        dispatch(setSuccess(note))
    }
}
export const SetNewList = (list) =>{
    return dispatch =>{
        dispatch(setDataListSuccess(list))
    }
}