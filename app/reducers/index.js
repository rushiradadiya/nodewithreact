import { combineReducers } from 'redux';
import UserReducer from "./userReducer";
import ProductReducer from "./productReducer"


export default appReducer = combineReducers({
    user: UserReducer,
    product:ProductReducer
});
