/*
redux 核心管理模块
 */
import {createStore,applyMiddleware} from "redux";
import reducers from './reducers'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
//最终向外暴露store对象
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))